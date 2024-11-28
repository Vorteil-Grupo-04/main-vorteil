package poi.tratamento;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import util.classes.Logv2;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

public abstract class TratamentoDados <T extends RespostaTratamento> {
    protected Logv2 logv2;
    protected FileInputStream arquivoAberto;
    protected HSSFWorkbook workbook;

    public TratamentoDados(String caminhoArquivo) throws IOException {
        logv2  = new Logv2("LogsTratamentoDeDados.txt");
        arquivoAberto = new FileInputStream(caminhoArquivo);
        workbook = new HSSFWorkbook(arquivoAberto);
    }

    public abstract List<T> lerXls();


    protected String getCellValueAsString(Cell cell) {
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
