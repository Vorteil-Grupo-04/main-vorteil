package S3;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.URL;

public class S3Downloader {
    public static void main(String[] args) {
        String url = "https://bucket-vorteil.s3.amazonaws.com/log.txt"; // URL do arquivo
        //Criar uma pasta na main chamada 'resources'
        String caminhoLocal = "src/main/resources"; // Caminho local para salvar

        try (InputStream in = new URL(url).openStream();
             FileOutputStream out = new FileOutputStream(caminhoLocal)) {

            byte[] dataBuffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = in.read(dataBuffer)) != -1) {
                out.write(dataBuffer, 0, bytesRead);
            }
            System.out.println("Arquivo CSV baixado com sucesso.");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}