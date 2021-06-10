import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FileUploadDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[];
}
export class FileUploadAvatarDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  avatar: string;
}

export class BodyDto {
  @ApiProperty({ description: '商品id' })
  @IsNotEmpty({ message: '商品id是必要的' })
  id: number;
}
