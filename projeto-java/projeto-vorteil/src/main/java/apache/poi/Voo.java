package apache.poi;

public class Voo {
    private String nome;
    private String empresaAerea;
    private String siglaAeroportoSaida;
    private String nomeAeroportoSaida;
    private String siglaAeroportoDestino;
    private String nomeAeroportoDestino;
    private String paisSaida;
    private String ufSaida;
    private String paisDestino;
    private String ufDestino;
    private Double porcentCancelamentos;
    private Double porcentAtrasoSuperior30;
    private Double porcentAtrasoSuperior60;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmpresaAerea() {
        return empresaAerea;
    }

    public void setEmpresaAerea(String empresaAerea) {
        this.empresaAerea = empresaAerea;
    }

    public String getSiglaAeroportoSaida() {
        return siglaAeroportoSaida;
    }

    public void setSiglaAeroportoSaida(String siglaAeroportoSaida) {
        this.siglaAeroportoSaida = siglaAeroportoSaida;
    }

    public String getNomeAeroportoSaida() {
        return nomeAeroportoSaida;
    }

    public void setNomeAeroportoSaida(String nomeAeroportoSaida) {
        this.nomeAeroportoSaida = nomeAeroportoSaida;
    }

    public String getSiglaAeroportoDestino() {
        return siglaAeroportoDestino;
    }

    public void setSiglaAeroportoDestino(String siglaAeroportoDestino) {
        this.siglaAeroportoDestino = siglaAeroportoDestino;
    }

    public String getNomeAeroportoDestino() {
        return nomeAeroportoDestino;
    }

    public void setNomeAeroportoDestino(String nomeAeroportoDestino) {
        this.nomeAeroportoDestino = nomeAeroportoDestino;
    }

    public String getPaisSaida() {
        return paisSaida;
    }

    public void setPaisSaida(String paisSaida) {
        this.paisSaida = paisSaida;
    }

    public String getUfSaida() {
        return ufSaida;
    }

    public void setUfSaida(String ufSaida) {
        this.ufSaida = ufSaida;
    }

    public String getPaisDestino() {
        return paisDestino;
    }

    public void setPaisDestino(String paisDestino) {
        this.paisDestino = paisDestino;
    }

    public String getUfDestino() {
        return ufDestino;
    }

    public void setUfDestino(String ufDestino) {
        this.ufDestino = ufDestino;
    }

    public Double getPorcentCancelamentos() {
        return porcentCancelamentos;
    }

    public void setPorcentCancelamentos(Double porcentCancelamentos) {
        this.porcentCancelamentos = porcentCancelamentos;
    }

    public Double getPorcentAtrasoSuperior30() {
        return porcentAtrasoSuperior30;
    }

    public void setPorcentAtrasoSuperior30(Double porcentAtrasoSuperior30) {
        this.porcentAtrasoSuperior30 = porcentAtrasoSuperior30;
    }

    public Double getPorcentAtrasoSuperior60() {
        return porcentAtrasoSuperior60;
    }

    public void setPorcentAtrasoSuperior60(Double porcentAtrasoSuperior60) {
        this.porcentAtrasoSuperior60 = porcentAtrasoSuperior60;
    }



    @Override
    public String toString() {
        return "Voo{" +
                "empresaAerea='" + empresaAerea + '\'' +
                ", siglaAeroportoSaida='" + siglaAeroportoSaida + '\'' +
                ", nomeAeroportoSaida='" + nomeAeroportoSaida + '\'' +
                ", ufAeroportoSaida='" + ufSaida + '\'' +
                ", paisAeroportoSaida='" + paisSaida + '\'' +
                ", siglaAeroportoDestino='" + siglaAeroportoDestino + '\'' +
                ", nomeAeroportoDestino='" + nomeAeroportoDestino + '\'' +
                ", ufAeroportoDestino='" + ufDestino + '\'' +
                ", paisAeroportoDestino='" + paisDestino + '\'' +
                ", porcentCancelamentos=" + porcentCancelamentos +
                ", porcentAtrasoSuperior30=" + porcentAtrasoSuperior30 +
                ", porcentAtrasoSuperior60=" + porcentAtrasoSuperior60 +

                '}';
    }
}
