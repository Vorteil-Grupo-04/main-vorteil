package main;

import S3.ConexaoS3;
import apache.poi.TratamentoDados;
import apache.poi.Voo;
import org.springframework.jdbc.core.JdbcTemplate;
import util.mysql.Conexao;

import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        ConexaoS3 conexaoS3 = new ConexaoS3();
        conexaoS3.baixarBucket();

        TratamentoDados tratamentoDados = new TratamentoDados();
        List <Voo> listaDeVoos;

        try {
            listaDeVoos = tratamentoDados.lerXls("percentuais.xls");

        } catch (RuntimeException | FileNotFoundException e){
            throw new RuntimeException();
        }

        Voo primeirovoo = listaDeVoos.get(2);
        Conexao conexao = new Conexao();
        JdbcTemplate conexaoDoBanco = conexao.getConexaoDoBanco();

        conexaoDoBanco.update("INSERT INTO vorteil (empresaAerea, siglaAeroportoSaida, nomeAeroportoSaida, siglaAeroportoDestino, nomeAeroportoDestino, cidadeSaida, cidadeDestino, porcentCancelamentos, porcentAtrasoSuperior30, porcentAtrasoSuperior60) VALUES (?,?,?,?,?,?,?,?,?,?)", primeirovoo.getEmpresaAerea(), primeirovoo.getSiglaAeroportoSaida(), primeirovoo.getNomeAeroportoSaida(), primeirovoo.getSiglaAeroportoDestino(), primeirovoo.getNomeAeroportoDestino(), primeirovoo.getCidadeSaida(), primeirovoo.getCidadeDestino(), primeirovoo.getPorcentCancelamentos(), primeirovoo.getPorcentAtrasoSuperior30(), primeirovoo.getPorcentAtrasoSuperior60());

        System.out.println("Todos os dados inseridos no BD");
    }


}
