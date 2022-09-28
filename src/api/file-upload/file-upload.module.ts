import { MinioClientModule } from './../../share/minio-client/minio-client.module';
import { MinioModule } from 'nestjs-minio-client';
import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';

@Module({
  imports: [MinioClientModule],
  controllers: [FileUploadController],
  providers: [FileUploadService]
})
export class FileUploadModule { }
