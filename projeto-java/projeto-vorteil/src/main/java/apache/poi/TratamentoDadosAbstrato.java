package apache.poi;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import util.classes.Logv2;

public abstract class TratamentoDadosAbstrato {
    private Logv2 logv2;
    private FileInputStream arquivoAberto;
    private HSSFWorkbook workbook;


    public TratamentoDadosAbstrato(String caminhoArquivo) throws IOException {
        logv2 = new Logv2("LogsTratamentoDeDados.txt");
        arquivoAberto = new FileInputStream(caminhoArquivo);
        workbook = new HSSFWorkbook(arquivoAberto);
    }


    public List<RespostaTratamento> lerXls() {
        return null;
    }

    // método da classe mãe
    public String getCellValueAsString(Cell cell) {
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
}
