import { Module } from '@nestjs/common';
import { MinioModule } from 'nestjs-minio-client';
import { config } from './config';
import { MinioClientService } from './minio-client.service';

@Module({
  imports: [
    MinioModule.register({
      endPoint: config.MINIO_ENDPOINT,
      port: +config.MINIO_PORT,
      useSSL: false,
      accessKey: config.MINIO_ACCESSKEY,
      secretkey: config.MINIO_SECRETKEY,
    })
  ],
  controllers: [],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule { }
