package poi.tratamento;

import apache.poi.Reclamacao;
import apache.poi.tratamento.enums.ComoComprouContratou;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


public class TratamentoDadosReclamacao extends TratamentoDados<Reclamacao> {

    private List<Reclamacao> reclamacoes;

    public TratamentoDadosReclamacao(String caminhoArquivo) throws IOException {
        super(caminhoArquivo);
        reclamacoes = new ArrayList<>();
    }

    @Override
    public List<Reclamacao> lerXls() {
        try {
            System.out.println("Arquivo Excel foi aberto.");
            logv2.criarLog("Arquivo Excel Reclamações foi aberto.");
            HSSFSheet sheet = workbook.getSheetAt(0);
            System.out.println("Planilha acessada!");
            logv2.criarLog("Planilha Reclamações acessada!");
            for (Row currentRow : sheet) {
                    Reclamacao reclamacao = new Reclamacao();
                    for (Cell celula : currentRow) {
                        if (celula != null && !getCellValueAsString(celula).isBlank()) {
                            //FAIXA ETARIA
                            if(celula.getColumnIndex() == 6 && !getCellValueAsString(celula).isEmpty())
                            {
                                reclamacao.setFaixaEtaria(getCellValueAsString(celula));

                            }else if(celula.getColumnIndex() == 28 && !getCellValueAsString(celula).isEmpty()){
                                //comoComprouContratou
                                ComoComprouContratou resultado = switch (getCellValueAsString(celula)){
                                    case "Internet" -> ComoComprouContratou.INTERNET;
                                    case "Não compreo / contratei" -> ComoComprouContratou.NAO_COMPREI;
                                    case "Loja física" -> ComoComprouContratou.LOJA_FISICA;
                                    case "Catálogo" -> ComoComprouContratou.CATALOGO;
                                    case "Domicílio" -> ComoComprouContratou.DOMICILIO;
                                    case "Ganhei de presente" -> ComoComprouContratou.GANHEI_DE_PRESENTE;
                                    case "Stand, feiras e eventos" -> ComoComprouContratou.STAND_FEIRA_EVENTO;
                                    case "Telefone" -> ComoComprouContratou.TELEFONE;
                                    case "SMS" -> ComoComprouContratou.SMS;
                                    default -> null;
                                };
                                reclamacao.setComoComprouContratou(resultado);
                            }
                        }

                    }
                if ((reclamacao.getComoComprouContratou() != null && reclamacao.getFaixaEtaria() != null)){
                    reclamacoes.add(reclamacao); // Adiciona reclamacao á lista composta
                }
            }

//            reclamacoes.forEach(System.out::println);

//             Exibir os dados filtrados
            System.out.println("Todas as linhas das reclamações foram processadas.");
            logv2.criarLog("Todas as linhas das reclamações foram processadas.");
            return reclamacoes;

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
