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


    public List<Voo> lerXls(String caminhoArquivo) throws FileNotFoundException {
        try (FileInputStream arquivoAberto = new FileInputStream(caminhoArquivo);
             HSSFWorkbook workbook = new HSSFWorkbook(arquivoAberto)) {
            System.out.println("Arquivo Excel foi aberto.");
            HSSFSheet sheet = workbook.getSheetAt(0);
            System.out.println("Planilha acessada!");


            List<Voo> voos = new ArrayList<>();
            DecimalFormat decimal = new DecimalFormat("#,00");

            for (Row currentRow : sheet) {
                boolean isBrasil = false;
                        Voo voo = new Voo();

                for (Cell celula : currentRow) {
                    if (celula != null && !getCellValueAsString(celula).isBlank()) {
//                        System.out.println(getCellValueAsString(celula));
//                        System.out.println("Index da celula: " + celula.getColumnIndex() + " ");
//                        System.out.println("valor da celula: " + getCellValueAsString(celula));
                        if(celula.getColumnIndex() == 0 && !getCellValueAsString(celula).isEmpty())
                        {
                            voo.setEmpresaAerea(getCellValueAsString(celula));
                        }else if(celula.getColumnIndex() == 2 && !getCellValueAsString(celula).isEmpty()){
                            voo.setSiglaAeroportoSaida(getCellValueAsString(celula));
                        }else if(celula.getColumnIndex() == 3 && !getCellValueAsString(celula).isEmpty()){
                            voo.setNomeAeroportoSaida(getCellValueAsString(celula));
                        }else if(celula.getColumnIndex() == 4 && !getCellValueAsString(celula).isEmpty()){
                            voo.setSiglaAeroportoDestino(getCellValueAsString(celula));
                        }else if(celula.getColumnIndex() == 5 && !getCellValueAsString(celula).isEmpty()){
                            voo.setNomeAeroportoDestino(getCellValueAsString(celula));
                        }else if(celula.getColumnIndex() == 7 && !getCellValueAsString(celula).isEmpty() && !getCellValueAsString(celula).contains("% de Cancelamento")){
                            voo.setPorcentCancelamentos(Double.parseDouble(getCellValueAsString(celula)));
                        }else if(celula.getColumnIndex() == 8 && !getCellValueAsString(celula).isEmpty() && !getCellValueAsString(celula).contains("Superiores a 30 min.") && !getCellValueAsString(celula).contains("% de Atrasos")){
                            voo.setPorcentAtrasoSuperior30(Double.parseDouble(getCellValueAsString(celula)));
                        }else if(celula.getColumnIndex() == 9 && !getCellValueAsString(celula).isEmpty() && !getCellValueAsString(celula).contains("Superiores a 60 min.") && !getCellValueAsString(celula).contains("% de Atrasos")){
                            voo.setPorcentAtrasoSuperior60(Double.parseDouble(getCellValueAsString(celula)));
                        }

                    }

                }
                        if (voo.getEmpresaAerea() != null){
                            voos.add(voo);
                        }
            }

//             Exibir os dados filtrados
            System.out.println("Todas as linhas foram processadas.");
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

    public static List<Voo> converterBaseDeDados() {
        TratamentoDados tratamentoDados = new TratamentoDados();
        String path = System.getProperty("user.dir"); System.out.println("Working Directory = " + path);
        try {
           return tratamentoDados.lerXls("percentuaisTeste.xls");
        } catch (FileNotFoundException e) {
            throw new RuntimeException();
        }
    }
}
