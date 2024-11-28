package poi.tratamento;

import apache.poi.Voo;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TratamentoDadosAtrasoCancelamento extends TratamentoDados<Voo>{

    public List<Voo> voos;

    public TratamentoDadosAtrasoCancelamento(String caminhoArquivo) throws IOException {
        super(caminhoArquivo);
        voos = new ArrayList<>();
    }

    public List<Voo> lerXls() {
        try {
            System.out.println("Arquivo Excel foi aberto.");
            logv2.criarLog("Arquivo Excel foi aberto.");
            HSSFSheet sheet = workbook.getSheetAt(0);
            System.out.println("Planilha acessada!");
            logv2.criarLog("Planilha acessada!");
            for (Row currentRow : sheet) {
                Voo voo = new Voo();
                for (Cell celula : currentRow) {
                    if (celula != null && !getCellValueAsString(celula).isBlank()) {
                        if(celula.getColumnIndex() == 0 && !getCellValueAsString(celula).isEmpty())
                        {
                            voo.setEmpresaAerea(getCellValueAsString(celula));
                        }else if(celula.getColumnIndex() == 2 && !getCellValueAsString(celula).isEmpty()){
                            voo.setSiglaAeroportoSaida(getCellValueAsString(celula));
                        }else if(celula.getColumnIndex() == 3 && !getCellValueAsString(celula).isEmpty()){
                            String regex = "(.*)\\((.*),(.*)\\)";
                            Pattern pattern = Pattern.compile(regex);
                            Matcher matcher = pattern.matcher(getCellValueAsString(celula));
                            if (matcher.find()) {
                                String nomeAeroporto = matcher.group(1);
                                String uf = matcher.group(2);
                                String pais = matcher.group(3).replace(" ", "");

                                voo.setNomeAeroportoSaida(nomeAeroporto);
                                voo.setUfSaida(uf);
                                voo.setPaisSaida(pais);

                            }
                        }else if(celula.getColumnIndex() == 4 && !getCellValueAsString(celula).isEmpty()){
                            voo.setSiglaAeroportoDestino(getCellValueAsString(celula));
                        }else if(celula.getColumnIndex() == 5 && !getCellValueAsString(celula).isEmpty()){
                            String regex = "(.*)\\((.*),(.*)\\)";
                            Pattern pattern = Pattern.compile(regex);
                            Matcher matcher = pattern.matcher(getCellValueAsString(celula));
                            if (matcher.find()) {
                                String nomeAeroporto = matcher.group(1);
                                String uf = matcher.group(2);
                                String pais = matcher.group(3).replace(" ", "");

                                voo.setNomeAeroportoDestino(nomeAeroporto);
                                voo.setUfDestino(uf);
                                voo.setPaisDestino(pais);
                            }
                        }else if(celula.getColumnIndex() == 7 && !getCellValueAsString(celula).isEmpty() && !getCellValueAsString(celula).contains("% de Cancelamento")){
                            voo.setPorcentCancelamentos(Double.parseDouble(getCellValueAsString(celula)));
                        }else if(celula.getColumnIndex() == 8 && !getCellValueAsString(celula).isEmpty() && !getCellValueAsString(celula).contains("Superiores a 30 min.") && !getCellValueAsString(celula).contains("% de Atrasos")){
                            voo.setPorcentAtrasoSuperior30(Double.parseDouble(getCellValueAsString(celula)));
                        }else if(celula.getColumnIndex() == 9 && !getCellValueAsString(celula).isEmpty() && !getCellValueAsString(celula).contains("Superiores a 60 min.") && !getCellValueAsString(celula).contains("% de Atrasos")){
                            voo.setPorcentAtrasoSuperior60(Double.parseDouble(getCellValueAsString(celula)));
                        }

                    }

                }
                if ((voo.getNomeAeroportoSaida() != null && voo.getUfSaida() != null && voo.getPaisSaida() != null) && (voo.getNomeAeroportoDestino() != null && voo.getUfDestino() != null && voo.getPaisDestino() != null) ){
                    voos.add(voo); // Adiciona voo á lista composta
                }
            }

//             Exibir os dados filtrados
            System.out.println("Todas as linhas foram processadas.");
            logv2.criarLog("Todas as linhas foram processadas.");
            return voos;

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
