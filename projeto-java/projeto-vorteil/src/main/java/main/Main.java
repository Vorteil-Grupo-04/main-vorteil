package main;

import S3.ConexaoS3;
import apache.poi.Reclamacao;
import apache.poi.tratamento.TratamentoDados;
import apache.poi.tratamento.TratamentoDadosAtrasoCancelamento;
import apache.poi.Voo;
import apache.poi.tratamento.TratamentoDadosReclamacao;
import org.json.JSONObject;
import org.springframework.jdbc.core.JdbcTemplate;
import util.classes.Logv2;
import util.classes.Slack;
import util.mysql.Conexao;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        ZoneId fusoSp = ZoneId.of("America/Sao_Paulo");
        LocalDateTime dataInicio = LocalDateTime.now(fusoSp);
        DateTimeFormatter horarioFormato = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

        String horarioInicioFormatado = dataInicio.format(horarioFormato);
        enviarMensagemSlack("Iniciando execução do JAR - " + horarioInicioFormatado);


        Logv2 logv2 = new Logv2("LogsBD.txt");
        Conexao conexao = new Conexao();
        JdbcTemplate conexaoDoBanco = conexao.getConexaoDoBanco();

  //      ConexaoS3.baixarBucket();

        enviarMensagemSlack("Conexão com Banco e S3 realizada, iniciando tratamento dos dados...");



        iniciarTratamentoCancelamento(conexaoDoBanco);

        iniciarTratamentoReclamacao(conexaoDoBanco);


        System.out.println("Todos os dados inseridos no Banco de dados");
        logv2.criarLog("Todos os dados inseridos no Banco de Dados.");

        LocalDateTime dataFim = LocalDateTime.now(fusoSp);
        Duration duracao =  Duration.between(dataInicio, dataFim);
        String horarioFImFormatado = dataFim.format(horarioFormato);
        enviarMensagemSlack("Finalizando execução do JAR - " + horarioFImFormatado);
        enviarMensagemSlack("Duração da execução: %02dh:%02dm:%02ds".formatted(duracao.toHoursPart(), duracao.toMinutesPart(), duracao.toSecondsPart()));
    }


    private static void enviarMensagemSlack(String textoMensagem) throws IOException {
        Logv2 logv2 = new Logv2("LogsSlack.txt");
        JSONObject json = new JSONObject();
        json.put("text", textoMensagem);
        try {
            Slack.sendMessage(json);
        } catch (Exception e){
            String texto = "Erro ao enviar a mensagem para o slack: " + e.getMessage();
            System.out.println(texto);
            logv2.criarLog(texto);
        }
    }

    private static void iniciarTratamentoCancelamento( JdbcTemplate conexaoDoBanco) throws IOException {
        enviarMensagemSlack("Iniciando tratamento da base de cancelamentos e atrasos...");

        TratamentoDados<Voo> tratamentoDados = new TratamentoDadosAtrasoCancelamento("percentuais.xls");
        List <Voo> listaDeVoos = tratamentoDados.lerXls();


        enviarMensagemSlack("Tratamento dos cancelamentos e atrasos concluido, Quantidade de registros tratados: " + listaDeVoos.size());
        System.out.println("Quantidade de registros: " + listaDeVoos.size());

        enviarMensagemSlack("Iniciando inserção dos dados de cancelamento e atraso no Banco de Dados...");
        System.out.println("Inserindo registros no banco de dados....");

        for (Voo vooAtual : listaDeVoos){
            conexaoDoBanco.update("INSERT INTO atrasoCancelamento (empresaAerea, siglaAeroportoSaida, nomeAeroportoSaida, ufAeroportoSaida, paisAeroportoSaida, siglaAeroportoDestino,  nomeAeroportoDestino, ufAeroportoDestino, paisAeroportoDestino, porcentCancelamentos, porcentAtrasoSuperior30, porcentAtrasoSuperior60) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", vooAtual.getEmpresaAerea(), vooAtual.getSiglaAeroportoSaida(), vooAtual.getNomeAeroportoSaida(), vooAtual.getUfSaida(), vooAtual.getPaisSaida() , vooAtual.getSiglaAeroportoDestino(), vooAtual.getNomeAeroportoDestino(), vooAtual.getUfDestino(),  vooAtual.getPaisDestino(), vooAtual.getPorcentCancelamentos(), vooAtual.getPorcentAtrasoSuperior30(), vooAtual.getPorcentAtrasoSuperior60());
        }
        enviarMensagemSlack("Dados inseridos no banco com sucesso!!");

    }

    private static void iniciarTratamentoReclamacao( JdbcTemplate conexaoDoBanco) throws IOException {
        enviarMensagemSlack("Iniciando tratamento da base de reclamações...");

        TratamentoDados<Reclamacao> tratamentoDados = new TratamentoDadosReclamacao("dadosdoconsumidor2019.xls");
        List <Reclamacao> listaDeReclamacoes = tratamentoDados.lerXls();


        enviarMensagemSlack("Tratamento das reclamações concluido, Quantidade de registros tratados: " + listaDeReclamacoes.size());
        System.out.println("Quantidade de registros: " + listaDeReclamacoes.size());

        enviarMensagemSlack("Iniciando inserção dos dados das reclamações no Banco de Dados...");
        System.out.println("Inserindo registros no banco de dados....");

        for (Reclamacao reclamacaoAtual : listaDeReclamacoes){
            conexaoDoBanco.update("INSERT INTO reclamacao (comoComprouContratou, faixaEtaria) VALUES (?,?)", reclamacaoAtual.getComoComprouContratou().toString(), reclamacaoAtual.getFaixaEtaria());
        }
        enviarMensagemSlack("Dados inseridos no banco com sucesso!!");

    }

}
