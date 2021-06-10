import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { fileFilter, storage } from '../../config/upload.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goods } from '../entities/Goods';

@Module({
  imports: [
    TypeOrmModule.forFeature([Goods]),
    MulterModule.register({
      storage,
      fileFilter,
      limits: {
        // 限制大小为1M
        fileSize: 1024 * 1024,
        // 限制文件数量
        files: 5,
      },
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
