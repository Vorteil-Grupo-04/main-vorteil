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
                "ASIAVPU47JDKWQSE5GYU",
                "IH9Fa+jlGC/o66V1asmbswOoCzN0FAY4RbwlJTnK",
                "IQoJb3JpZ2luX2VjEMP//////////wEaCXVzLXdlc3QtMiJHMEUCIEwyKC5XSghSYxwA7YXpwNFQ3XWgS1SuYA1SC+8uS/zlAiEA49NHR9bCw78hIPpkBBqxla6IUgXXNPK2ly9HgQOOicwquAIIPBABGgwzNzcyMTI1ODYxOTciDBx2XPKf95UUJdjVMSqVAp3Nquk73DUsqcqXEoxnEzvWJTYywA6vR9uBoxznP+gneblm1bJ0uCcFaZBJDepYxVFstp7mDlpIVFVi3aku4unPZm8m2a6svnGzRvd7vnIofuIY4HIc9Ne53NQwn8NOtCrlTKr7MktpQQr59E8Sk+T0Djd6wd80FkL1Nqd9iKHCCGuJMHzeJjlP7rRUPN4zd1tsSof8uYzyYbKWLBNi0hREpJHJmm21GpD4S98b1QHYo6zjk2awyeIEJWeDWX2j5ZW3SnIabD+FnJBwItGKkMyHSg7vR0uA4SQELOf5u1F7H0KNHdx3Rt9MkMYKFEoMQh6OWarnNJvZpXPr/9TAGvBZ1UeZ7PZfKdM9rM2F78vdNWPpqwwwgPL7uAY6nQH5wjEhENB7UacTaz+yTr5bLrtzKjLQFPQ2w5VStGd+Ax66QU8feCuZTrGcYCVpfZUUydyYIvd9mUnwTjybl7+oowYB93si2XmHYQoxwmHimUeSChok0+pu0NPNWY7xIVkOE7NoYZ0hHF+QRiHchlOBQSdRqrxON210Nurh9/msW0gwGzieKqw41CFGjn75EMlGqCWOJXA4WOMxWjwl"

        );




    }

    public S3Client getS3Client() {
        return S3Client.builder()
                .region(Region.US_EAST_1)
                .credentialsProvider(() -> credentials)
                .build();
    }
}
