package util.classes;

import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class Logv2 {
    private LocalDateTime dataAtual;
    private String repositorio = "src/main/java/util/logs/Logs.txt";

    //caminho ec2 /app/logs/Logs.log

    //camilho local src/main/java/util/logs

    public Logv2(String nomeArquivo){

        this.repositorio = "src/main/java/util/logs/%s".formatted(nomeArquivo);

    }

    public Logv2(){

    }

    public Boolean criarLog(String mensagem) throws IOException {
        ZoneId fusoSp = ZoneId.of("America/Sao_Paulo");

        this.dataAtual = LocalDateTime.now(fusoSp);
        DateTimeFormatter horarioFormato = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

        String horarioFormatado = dataAtual.format(horarioFormato);

        FileWriter escritor = new FileWriter(repositorio, true);

        escritor.write("\n" + horarioFormatado + " " + mensagem);
        escritor.close();

        return true;
    }




}
