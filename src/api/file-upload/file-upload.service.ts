import { MinioClientService } from './../../share/minio-client/minio-client.service';
import { Injectable } from '@nestjs/common';
import { BufferedFile } from 'src/share/minio-client/file.model';

@Injectable()
export class FileUploadService {

  constructor(private minioClientService: MinioClientService) { }

  async uploadSingle(image: BufferedFile) {
    let uploaded_image = await this.minioClientService.upload(image);
    return {
      image_url: uploaded_image.url,
      message: "Successfully uploaded to MinIO S3"
    }
  }

  async uploadMany(files: BufferedFile) {
    const upload = [];
    files['images'].forEach(async image => {
      let uploaded_image = await this.minioClientService.upload(image);
      upload.push(uploaded_image.url);
    });

    return {
      upload,
      message: 'Successfully uploaded mutiple image on MinioS3'
    }
  }

}
