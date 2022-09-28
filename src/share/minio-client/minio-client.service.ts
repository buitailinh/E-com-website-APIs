import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { Stream } from 'stream';
import { config } from './config';
import { BufferedFile } from './file.model';
import * as crypto from 'crypto';

@Injectable()
export class MinioClientService {
  private readonly logger: Logger;
  private readonly baseBucket = config.MINIO_BUCKET

  public get client() {
    return this.minio.client;
  }
  constructor(
    private readonly minio: MinioService,
  ) {
    this.logger = new Logger('MinioStrorageService');
  }

  public async upload(file: BufferedFile, baseBucket: string = this.baseBucket) {
    // console.log(file);
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/))
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    let temp_fileName = Date.now().toString();
    let hashedFileName = crypto.createHash('md5').update(temp_fileName).digest('hex');
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    const metaData = {
      'Content-Type': file.mimetype,
      'X-Amz-Meta-Testing': 1234,
    };
    let filename = hashedFileName + ext;
    const fileName: string = `${filename}`;
    const fileBuffer = file.buffer;
    this.client.putObject(baseBucket, fileName, fileBuffer, metaData, (err, res) => {
      if (err) throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);

    });
    return {
      url: `${config.MINIO_ENDPOINT}:${config.MINIO_PORT}/${config.MINIO_BUCKET}/${fileName}`
    }
  }

  async delete(objetName: string, baseBucket: string = this.baseBucket) {
    this.client.removeObject(baseBucket, objetName, function (err, res) {
      if (err) throw new HttpException('something wrong happened', HttpStatus.BAD_REQUEST);
    })
  }


}
