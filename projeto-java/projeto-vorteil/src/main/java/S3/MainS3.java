package S3;

import S3.S3Provider;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class MainS3 {
    public static void main(String[] args) {
        // Instanciando o cliente S3 via S3Provider
        S3Client s3Client = new S3Provider().getS3Client();
        String bucketName = "vorteil-teste";

        // Criando um novo bucket no S3
        try {
            CreateBucketRequest createBucketRequest = CreateBucketRequest.builder()
                    .bucket(bucketName)
                    .build();
            s3Client.createBucket(createBucketRequest);
            System.out.println("Bucket criado com sucesso: " + bucketName);
        } catch (S3Exception e) {
            // Ignorando erro ao criar o bucket, caso já exista
        }

        // Listando todos os buckets
        try {
            List<Bucket> buckets = s3Client.listBuckets().buckets();
            System.out.println("Lista de buckets:");
            for (Bucket bucket : buckets) {
                System.out.println("- " + bucket.name());
            }
        } catch (S3Exception e) {
            // Ignorando erro ao listar buckets
        }

        // Listando objetos do bucket
        try {
            ListObjectsRequest listObjects = ListObjectsRequest.builder()
                    .bucket(bucketName)
                    .build();

            List<S3Object> objects = s3Client.listObjects(listObjects).contents();
            System.out.println("Objetos no bucket " + bucketName + ":");
            for (S3Object object : objects) {
                System.out.println("- " + object.key());
            }
        } catch (S3Exception e) {
            // Ignorando erro ao listar objetos no bucket
        }

        // Fazendo download de arquivos
        try {
            List<S3Object> objects = s3Client.listObjects(ListObjectsRequest.builder().bucket(bucketName).build()).contents();
            for (S3Object object : objects) {
                GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                        .bucket(bucketName)
                        .key(object.key())
                        .build();

                // Definindo o caminho para salvar o arquivo
                Path localFilePath = Paths.get(object.key());

                // Verifica se o arquivo já existe
                if (Files.exists(localFilePath)) {
                    // Se o arquivo já existe, ignora o download
                    continue; // Pula para o próximo arquivo
                }

                // Salvando o arquivo baixado no diretório atual com o nome do objeto S3
                try (InputStream inputStream = s3Client.getObject(getObjectRequest, ResponseTransformer.toInputStream())) {
                    Files.copy(inputStream, localFilePath); // Salvar o arquivo no diretório atual
                } catch (IOException e) {
                    // Ignorando erro ao salvar o arquivo
                }
            }
        } catch (S3Exception e) {
            // Ignorando erro ao fazer download dos arquivos
        }

        // Deletando um objeto do bucket
        try {
            String objectKeyToDelete = "identificador-do-arquivo";
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(objectKeyToDelete)
                    .build();
            s3Client.deleteObject(deleteObjectRequest);

            System.out.println("Objeto deletado com sucesso: " + objectKeyToDelete);
        } catch (S3Exception e) {
            // Ignorando erro ao deletar objeto
        }
    }
}
