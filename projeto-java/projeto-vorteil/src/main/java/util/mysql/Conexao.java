//import org.apache.commons.dbcp2.BasicDataSource;
//import org.springframework.jdbc.core.JdbcTemplate;
//
//public class Conexao {
//
//    private JdbcTemplate conexaoDoBanco;
//
//    public Conexao() {
//        BasicDataSource dataSource = new BasicDataSource(); //Transformando a classe/arquivo da biblioteca importada num "objeto" para podermos entrar/usa-lo
//        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver"); //Conforme o objeto definido acima, utilizar o metodo nele existente para informar o driver/motor que será utilizado (padronizado assim)
//        dataSource.setUrl("jdbc:mysql://localhost:3306/vorteil"); //Define o caminho para encontrar o BD e sua porta
//        dataSource.setUsername("root"); //Nome do BD
//        dataSource.setPassword("07112018"); //Colocar senha do BD para funcionar
//        dataSource.setInitialSize(5); //Quantas conexões poderão ser utilizadas simultaneamente - verificar o quão relevante é isso
//        dataSource.setMaxTotal(10); //Maximo delas - verificar o quão relevante é isso
//
//        conexaoDoBanco = new JdbcTemplate(dataSource); //Está definindo o conexaoDoBanco utilizando a biblioteca, mas como parâmetro do dataSource que configurou-se acima
//
//    }
//
//    public JdbcTemplate getConexaoDoBanco() {
//        return conexaoDoBanco;
//    }
//}
//
