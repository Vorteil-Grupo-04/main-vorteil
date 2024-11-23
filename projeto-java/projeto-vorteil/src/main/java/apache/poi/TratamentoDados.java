package apache.poi;

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import util.classes.Logv2;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TratamentoDados {
    static Logger logger = Logger.getLogger(TratamentoDados.class.getName());

    private List<Voo> voos;

    public TratamentoDados() {
        voos = new ArrayList<>();
    }

    public List<Voo> lerXls(String caminhoArquivo) throws FileNotFoundException {
        Logv2 logv2 = new Logv2("LogsTratamentoDeDados.log");
        try (FileInputStream arquivoAberto = new FileInputStream(caminhoArquivo);
             HSSFWorkbook workbook = new HSSFWorkbook(arquivoAberto)) {

            System.out.println("Arquivo Excel foi aberto.");
            logv2.criarLog("Arquivo Excel foi aberto.");
            HSSFSheet sheet = workbook.getSheetAt(0);

            DecimalFormat decimal = new DecimalFormat("#,00");

            for (Row currentRow : sheet) {
                Voo voo = new Voo(); 

                for (Cell celula : currentRow) {
                    if (celula != null && !getCellValueAsString(celula).isBlank()) {
                        if (celula.getColumnIndex() == 0 && !getCellValueAsString(celula).isEmpty()) {
                            voo.setEmpresaAerea(getCellValueAsString(celula));
                        } else if (celula.getColumnIndex() == 2 && !getCellValueAsString(celula).isEmpty()) {
                            voo.setSiglaAeroportoSaida(getCellValueAsString(celula));
                        } else if (celula.getColumnIndex() == 3 && !getCellValueAsString(celula).isEmpty()) {
                            String regex = "(.*)\\((.*),(.*)\\)";
                            Pattern pattern = Pattern.compile(regex);
                            Matcher matcher = pattern.matcher(getCellValueAsString(celula));
                            if (matcher.find()) {
                                voo.setNomeAeroportoSaida(matcher.group(1));
                                voo.setUfSaida(matcher.group(2));
                                voo.setPaisSaida(matcher.group(3).replace(" ", ""));
                            }
                        } else if (celula.getColumnIndex() == 4 && !getCellValueAsString(celula).isEmpty()) {
                            voo.setSiglaAeroportoDestino(getCellValueAsString(celula));
                        } else if (celula.getColumnIndex() == 5 && !getCellValueAsString(celula).isEmpty()) {
                            String regex = "(.*)\\((.*),(.*)\\)";
                            Pattern pattern = Pattern.compile(regex);
                            Matcher matcher = pattern.matcher(getCellValueAsString(celula));
                            if (matcher.find()) {
                                voo.setNomeAeroportoDestino(matcher.group(1));
                                voo.setUfDestino(matcher.group(2));
                                voo.setPaisDestino(matcher.group(3).replace(" ", ""));
                            }
                        } else if (celula.getColumnIndex() == 7 && !getCellValueAsString(celula).isEmpty()) {
                            voo.setPorcentCancelamentos(Double.parseDouble(getCellValueAsString(celula)));
                        } else if (celula.getColumnIndex() == 8 && !getCellValueAsString(celula).isEmpty()) {
                            voo.setPorcentAtrasoSuperior30(Double.parseDouble(getCellValueAsString(celula)));
                        } else if (celula.getColumnIndex() == 9 && !getCellValueAsString(celula).isEmpty()) {
                            voo.setPorcentAtrasoSuperior60(Double.parseDouble(getCellValueAsString(celula)));
                        }
                    }
                }

                if (voo.getNomeAeroportoSaida() != null && voo.getUfSaida() != null && voo.getPaisSaida() != null &&
                        voo.getNomeAeroportoDestino() != null && voo.getUfDestino() != null && voo.getPaisDestino() != null) {
                    voos.add(voo); // Adiciona voo à lista composta
                }
            }

            System.out.println("Todas as linhas foram processadas.");
            logv2.criarLog("Todas as linhas foram processadas.");
            return voos;

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private String getCellValueAsString(Cell cell) {
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                return String.valueOf(cell.getNumericCellValue());
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                return cell.getCellFormula();
            default:
                return "";
        }
    }


    public List<Voo> getVoos() {
        return voos;
    }
}