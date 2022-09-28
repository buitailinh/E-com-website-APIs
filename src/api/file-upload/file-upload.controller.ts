import { BufferedFile } from './../../share/minio-client/file.model';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, UploadedFile } from '@nestjs/common';

import { FileUploadService } from './file-upload.service';


@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) { }

  @Post('single')
  @UseInterceptors(FileInterceptor('image'))
  async upload(@UploadedFile() image: BufferedFile) {
    // console.log(image);
    return await this.fileUploadService.uploadSingle(image)
  }

  @Post('many')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images' }]))
  async uploadMany(@UploadedFiles() images: BufferedFile) {
    // console.log(images);
    return this.fileUploadService.uploadMany(images);
  }

}
