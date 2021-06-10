import {
  ArgumentMetadata,
  HttpException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { AddGoodsDto } from './dto/add-goods.dto';

@Injectable()
export class GoodsPipe implements PipeTransform {
  transform(value: AddGoodsDto, metadata: ArgumentMetadata) {
    const { status, imgs } = value;
    if (imgs) {
      try {
        // const result = JSON.parse(imgs);
        imgs.forEach((item) => {
          if (typeof item !== 'string') {
            throw new HttpException(
              { code: 400, message: '请传入字符串数组' },
              400,
            );
          }
        });
      } catch (error) {
        throw new HttpException(
          { code: 400, message: '请传入字符串数组' },
          400,
        );
      }
    }
    switch (status) {
      case '下架':
      case '在售':
        return value;
      default:
        throw new HttpException({ status: 400, msg: 'status错误' }, 400);
    }
  }
}
