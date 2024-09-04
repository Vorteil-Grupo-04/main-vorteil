import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ThreadLocalRandom;

public class Log {
    public static void main(String[] args) {

        Timer temporizador = new Timer();
        TimerTask tarefa = new TimerTask() {
            @Override
            public void run() {
                LocalDateTime horarioAtual = LocalDateTime.now();
                DateTimeFormatter horarioFormato = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
                String horarioFormatado = horarioAtual.format(horarioFormato);

                List<String> listaUsuarios = Arrays.asList("Juan","Antonio", "Felipe", "Filipe", "Marcela", "Samuel");
                String usuarioCadastrado = listaUsuarios.get(ThreadLocalRandom.current().nextInt(listaUsuarios.size()));

                System.out.println("""
                %s - Usuário %s Cadastrado no sistema com sucesso.
                """.formatted(horarioFormatado, usuarioCadastrado));
            }
            };

        Integer aleatorio = ThreadLocalRandom.current().nextInt(1000, 5001);
            temporizador.scheduleAtFixedRate(tarefa, 0, 5000 + aleatorio);
        }


}
