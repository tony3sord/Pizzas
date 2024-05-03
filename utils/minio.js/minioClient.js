import * as Minio from "minio";
import dotenv from dotenv;
dotenv.config();

const endPoint = process.env.HOST_MINIO;
const port = process.env.PORT_MINIO;
const accessKey = process.env.ACCESS_KEY;
const secretKey = process.env.SECRET_KEY;

export const minioClient = new Minio.Client({
  endPoint,
  port,
  useSSL: true,
  accessKey,
  secretKey,
});
