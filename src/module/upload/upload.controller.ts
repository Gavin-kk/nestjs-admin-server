import {
  Body,
  Controller,
  Delete,
  HttpException,
  Param,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteImgDto } from './dto/delete-img.dto';
import {
  BodyDto,
  FileUploadAvatarDto,
  FileUploadDto,
} from './dto/file-upload.dto';
import { UploadService } from './upload.service';

@Controller('upload')
@ApiTags('文件上传')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('add')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '提交图片',
    type: FileUploadDto,
  })
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<{ names: string[]; urls: string[] }> {
    return this.uploadService.saveImgUrl(files);
  }

  @Delete('delete')
  @ApiOperation({ summary: '删除上传的图片' })
  removeImg(@Query() deleteImgDto: DeleteImgDto) {
    return this.uploadService.removeImg(deleteImgDto);
  }

  @Post('avatar')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '提交图片',
    type: FileUploadAvatarDto,
  })
  @UseInterceptors(FileInterceptor('avatar'))
  uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.saveImgUrl([file]);
  }
}
