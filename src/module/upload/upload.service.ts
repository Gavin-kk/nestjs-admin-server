import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readdir, readdirSync, unlinkSync } from 'fs';
import { resolve } from 'path';
import { Goods } from '../../entities/Goods';
import { Repository } from 'typeorm';
import { DeleteImgDto } from './dto/delete-img.dto';
import { unlink } from 'fs/promises';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Goods)
    private readonly goodsRepository: Repository<Goods>,
  ) {}
  private uploadPath = resolve(__dirname, '../../../upload');

  public async saveImgUrl(files: Express.Multer.File[]) {
    const urls: string[] = [];
    const names: string[] | null = [];
    files.forEach((item) => {
      if (item.mimetype.indexOf('image') !== -1) {
        names.push(item.filename);
        urls.push(
          `http://${process.env.APP_HOST}:${process.env.APP_PORT}/static/${item.filename}`,
        );
      }
    });
    return {
      names,
      urls,
    };
  }

  public async removeImg(deleteImgDto: DeleteImgDto) {
    const { name } = deleteImgDto;
    const img = readdirSync(this.uploadPath);
    const fileToBeDeleted = img.filter((item: string) => item === name);
    if (fileToBeDeleted.length === 0) {
      throw new HttpException({ code: 400, msg: '图片不存在' }, 400);
    }
    // 删除文件
    await unlink(`${this.uploadPath}/${fileToBeDeleted[0]}`);
    return true;
  }
}
