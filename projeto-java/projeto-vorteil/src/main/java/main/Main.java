package main;

import S3.ConexaoS3;
import apache.poi.TratamentoDados;
import apache.poi.Voo;
import org.springframework.jdbc.core.JdbcTemplate;
import util.classes.Logv2;
import util.mysql.Conexao;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
//        Logv2 logv2 = new Logv2("LogsBD.log");
        ConexaoS3 conexaoS3 = new ConexaoS3();
        conexaoS3.baixarBucket();

        TratamentoDados tratamentoDados = new TratamentoDados();
        List <Voo> listaDeVoos;

            listaDeVoos = tratamentoDados.lerXls("percentuais.xls");

        Conexao conexao = new Conexao();
        JdbcTemplate conexaoDoBanco = conexao.getConexaoDoBanco();
        System.out.println(listaDeVoos.size());
        for (Voo vooAtual : listaDeVoos){
        conexaoDoBanco.update("INSERT INTO vorteil (empresaAerea, siglaAeroportoSaida, nomeAeroportoSaida, ufAeroportoSaida, paisAeroportoSaida, siglaAeroportoDestino,  nomeAeroportoDestino, ufAeroportoDestino, paisAeroportoDestino, porcentCancelamentos, porcentAtrasoSuperior30, porcentAtrasoSuperior60) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", vooAtual.getEmpresaAerea(), vooAtual.getSiglaAeroportoSaida(), vooAtual.getNomeAeroportoSaida(), vooAtual.getUfSaida(), vooAtual.getPaisSaida() , vooAtual.getSiglaAeroportoDestino(), vooAtual.getNomeAeroportoDestino(), vooAtual.getUfDestino(),  vooAtual.getPaisDestino(), vooAtual.getPorcentCancelamentos(), vooAtual.getPorcentAtrasoSuperior30(), vooAtual.getPorcentAtrasoSuperior60());

        }
        System.out.println("Todos os dados inseridos no BD");
//        logv2.criarLog("Todos os dados inseridos no BD.");
    }


}
