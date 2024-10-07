package util.mysql;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class Teste {
    public static void main(String[] args) {
        Conexao conexao = new Conexao();
        JdbcTemplate con = conexao.getConexaoDoBanco();

        con.execute("DROP TABLE IF EXISTS filme");

        con.execute("""
                CREATE TABLE filme (
                id INT PRIMARY KEY AUTO_INCREMENT,
                nome VARCHAR(255) NOT NULL,
                anoLancamento INT)""");

        con.update("INSERT INTO filme (nome, anoLancamento) VALUES ('Vingadores 2', 2017)");
        con.update("INSERT INTO filme (nome, anoLancamento) VALUES ('Procurando Nemo', 2007)");
        con.update("INSERT INTO filme (nome, anoLancamento) VALUES ('Os Incriveis', 2009)");

        Filme filmeNovo = new Filme();
        filmeNovo.setNome("Harry Potter");
        filmeNovo.setAnoLancamento(2004);

        con.update("INSERT INTO filme (nome, anoLancamento) VALUES (?, ?)", filmeNovo.getNome(), filmeNovo.getAnoLancamento());

        List<Filme> filmesDoBanco = con.query("SELECT * FROM filme", new BeanPropertyRowMapper<>(Filme.class));

        System.out.println(filmesDoBanco);
    }
}
