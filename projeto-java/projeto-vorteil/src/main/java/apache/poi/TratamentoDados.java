package apache.poi;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

public class TratamentoDados {
    static Logger logger = Logger.getLogger(TratamentoDados.class.getName());
    public static class Voo {
        String nome;
        String empresaAerea;
        String siglaAeroportoSaida;
        String nomeAeroportoSaida;
        String siglaAeroportoDestino;
        String nomeAeroportoDestino;
        String cidadeSaida;
        String ufSaida;
        String cidadeDestino;
        String ufDestino;
        Double porcentCancelamentos;
        Double porcentAtrasoSuperior30;

        @Override
        public String toString() {
            return "Voo{" +
                    "nome='" + nome + '\'' +
                    ", empresaAerea='" + empresaAerea + '\'' +
                    ", siglaAeroportoSaida='" + siglaAeroportoSaida + '\'' +
                    ", nomeAeroportoSaida='" + nomeAeroportoSaida + '\'' +
                    ", siglaAeroportoDestino='" + siglaAeroportoDestino + '\'' +
                    ", nomeAeroportoDestino='" + nomeAeroportoDestino + '\'' +
                    ", cidadeSaida='" + cidadeSaida + '\'' +
                    ", ufSaida='" + ufSaida + '\'' +
                    ", cidadeDestino='" + cidadeDestino + '\'' +
                    ", ufDestino='" + ufDestino + '\'' +
                    ", porcentCancelamentos=" + porcentCancelamentos +
                    ", porcentAtrasoSuperior30=" + porcentAtrasoSuperior30 +
                    '}';
        }
    }

    public void lerXls(String caminhoArquivo) throws FileNotFoundException {
        try (FileInputStream arquivoAberto = new FileInputStream(caminhoArquivo);
             HSSFWorkbook workbook = new HSSFWorkbook(arquivoAberto)) {
            System.out.println("Arquivo Excel foi aberto.");
            HSSFSheet sheet = workbook.getSheetAt(0);
            System.out.println("Planilha acessada!");


            List<Voo> voos = new ArrayList<>();
            DecimalFormat decimal = new DecimalFormat("#,00");

            for (Row currentRow : sheet) {
                Voo voo = new Voo();
                boolean isBrasil = false;

                for (Cell celula : currentRow) {
                    System.out.println(celula);
                    if (celula != null) {
                        switch (celula.getColumnIndex()) {
                            case 0:
                                voo.empresaAerea = getCellValueAsString(celula);
                                break;
                            case 1:
                                voo.nome = getCellValueAsString(celula);
                                break;
                            case 2:
                                voo.siglaAeroportoSaida = getCellValueAsString(celula);
                                break;
                            case 3:
                                voo.nomeAeroportoSaida = getCellValueAsString(celula);
                                if (voo.nomeAeroportoSaida.contains("Brasil")) {
                                    isBrasil = true;
                                }
                                break;
                            case 4:
                                voo.siglaAeroportoDestino = getCellValueAsString(celula);
                                break;
                            case 5:
                                voo.nomeAeroportoDestino = getCellValueAsString(celula);
                                if (voo.nomeAeroportoDestino.contains("Brasil")) {
                                    isBrasil = true;
                                }
                                break;
                            case 6:
                                voo.cidadeSaida = getCellValueAsString(celula);
                                break;
                            case 7:
                                voo.ufSaida = getCellValueAsString(celula);
                                break;
                            case 8:
                                voo.cidadeDestino = getCellValueAsString(celula);
                                break;
                            case 9:
                                voo.ufDestino = getCellValueAsString(celula);
                                break;
                            case 10:
                                if (celula.getCellType() == CellType.NUMERIC) {
                                    voo.porcentCancelamentos = celula.getNumericCellValue();
                                }
                                break;
                            case 11:
                                if (celula.getCellType() == CellType.NUMERIC) {
                                    voo.porcentAtrasoSuperior30 = celula.getNumericCellValue();
                                }
                                break;
                        }
                    }
                }

                if (isBrasil) {
                    voos.add(voo);
                }
            }

            // Exibir os dados filtrados
            for (Voo voo : voos) {
                System.out.println(voo);
            }

            System.out.println("Todas as linhas foram processadas.");

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

    public static void main(String[] args) {
        TratamentoDados tratamentoDados = new TratamentoDados();
        String path = System.getProperty("user.dir"); System.out.println("Working Directory = " + path);
        try {
            tratamentoDados.lerXls("porcentuaisTeste.xls");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }
}
