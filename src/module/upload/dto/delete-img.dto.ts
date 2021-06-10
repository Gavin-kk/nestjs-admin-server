import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteImgDto {
  @ApiProperty({ description: '图片名' })
  @IsNotEmpty({ message: 'name不得为空' })
  name: string;
}
