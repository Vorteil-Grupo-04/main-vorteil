package poi;

import apache.poi.tratamento.RespostaTratamento;
import apache.poi.tratamento.enums.ComoComprouContratou;

public class Reclamacao implements RespostaTratamento {
    private ComoComprouContratou comoComprouContratou;
    private String faixaEtaria;

    public ComoComprouContratou getComoComprouContratou() {
        return comoComprouContratou;
    }

    public void setComoComprouContratou(ComoComprouContratou comoComprouContratou) {
        this.comoComprouContratou = comoComprouContratou;
    }

    public String getFaixaEtaria() {
        return faixaEtaria;
    }

    public void setFaixaEtaria(String faixaEtaria) {
        this.faixaEtaria = faixaEtaria;
    }

    @Override
    public String toString() {
        return "Reclamacao{" +
                "comoComprouContratou=" + comoComprouContratou +
                ", faixaEtaria='" + faixaEtaria + '\'' +
                '}';
    }
}
