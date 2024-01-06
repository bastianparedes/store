import { Client } from 'minio';

const minioClient = new Client({
  accessKey: process.env.MINIO_ROOT_USER,
  endPoint: process.env.MINIO_ROOT_ENDPOINT,
  port: Number(process.env.MINIO_ROOT_PORT),
  secretKey: process.env.MINIO_ROOT_PASSWORD,
  useSSL: false
});

minioClient.bucketExists('static', (error, result) => {
  if (!result) {
    minioClient.makeBucket('static');
  }
});

export default minioClient;
