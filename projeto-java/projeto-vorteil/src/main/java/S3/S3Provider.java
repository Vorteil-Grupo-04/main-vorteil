package S3;

import software.amazon.awssdk.auth.credentials.AwsSessionCredentials;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

public class S3Provider {

    private final AwsSessionCredentials credentials;

    public S3Provider() {
        System.out.println("Access Key: " + System.getenv("AWS_ACCESS_KEY_ID"));
        System.out.println("Secret Key: " + System.getenv("AWS_SECRET_ACCESS_KEY"));
        System.out.println("Session Token: " + System.getenv("AWS_SESSION_TOKEN"));

        // Criando credenciais
        this.credentials = AwsSessionCredentials.create(
                System.getenv("AWS_ACCESS_KEY_ID"),
//                "ASIAVPU47JDKSZZJ6TJ4",
                System.getenv("AWS_SECRET_ACCESS_KEY"),
//                "ULBJ/5Fxh5stdNuwG0GR/N6EKqvVetxSepU95y0H",
                System.getenv("AWS_SESSION_TOKEN")
//                "IQoJb3JpZ2luX2VjEP3//////////wEaCXVzLXdlc3QtMiJGMEQCIHWoVOWByHtNJ3R1Whpv/Kc7MBh5B+fJZdop8wPY49BrAiAQlsuJj2SY5E1oaHSpU5W92uOjIQ7ZD6WSZHVhGL2ORCrBAgiW//////////8BEAEaDDM3NzIxMjU4NjE5NyIM07hEoRcWn0PrQTKFKpUC9IX8+tepm8VHz1ZVsJoLbT3V3rjg52Ssil0JMRK/ypb+KZfrFLA7S4dTefvBh9ht+nOx55NAsZxhfFm4LqH+3r7Z25BCFqNTTOIPxRA+wqHDQKD81z0hu1srFtRRUl+Fij22Wq6/pC8/EPYP4i40JjRVIsd81bMFaSpsNJQ6Kcr3ka/YHdd6mvLp9orDt9GqLMGJAyQ9EjafUwXIYMnLSw2KiZggEZprOlr6o0gyMbzmuaRRpxWqUq4ORmZTf2+KWyUUG4gyl3iQj4kwifs7UY9Q+WPytKHyResjJpOLotPaFU4kTzMtxg0ODkEa3t1PLPTPzewa8CbnIcoraVWRjUoRA3u7QgbH4f+NHNTLFKuGa8IYWjC9ivm5BjqeAXayR9ItVe6XnIm5s2XRcd0WeZKmCJ/FDu50VGSm17d4LmkcSGwvRHpEvzRSJA5X14G/AnmPwc7HpHhn/zIMrSA7YM7kOTV401rc0n6JaYqupKCbdQTK0gs2Zp91zH0esOOICcOt7FVs2cB+OfnF8OVONVlsWs61+0hMgXiDVmSVfQTCnqWW5wfD3zYZhRrvR1Kj15TI9bcmdIkUlMeP"

        );




    }

    public S3Client getS3Client() {
        return S3Client.builder()
                .region(Region.US_EAST_1)
                .credentialsProvider(() -> credentials)
                .build();
    }
}
