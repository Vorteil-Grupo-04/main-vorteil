package S3;

import software.amazon.awssdk.auth.credentials.AwsSessionCredentials;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

public class S3Provider {



    public S3Provider() {
        System.out.println("Access Key: " + System.getenv("AWS_ACCESS_KEY_ID"));
        System.out.println("Secret Key: " + System.getenv("AWS_SECRET_ACCESS_KEY"));
        System.out.println("Session Token: " + System.getenv("AWS_SESSION_TOKEN"));

        // Criando credenciais

    }

    public S3Client getS3Client() {
        return S3Client.builder()
                .region(Region.US_EAST_1)
                .build();
    }
}
