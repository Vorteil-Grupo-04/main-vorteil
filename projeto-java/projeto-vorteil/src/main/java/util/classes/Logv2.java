package util.classes;

import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Logv2 {
    private LocalDateTime dataAtual;
    private String repositorio = ".\\src\\main\\java\\util\\log/Logs.log";

    public Logv2(String nomeArquivo){

        this.repositorio = ".\\src\\main\\java\\util\\logs/%s".formatted(nomeArquivo);

    }

    public Logv2(){

    }

    public Boolean criarLog(String mensagem) throws IOException {
        this.dataAtual = LocalDateTime.now();
        DateTimeFormatter horarioFormato = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

        String horarioFormatado = dataAtual.format(horarioFormato);

        FileWriter escritor = new FileWriter(repositorio, true);

        escritor.write("\n" + horarioFormatado + " " + mensagem);
        escritor.close();

        return true;
    }




}
