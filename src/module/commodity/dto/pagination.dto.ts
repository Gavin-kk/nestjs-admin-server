import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({ description: '每页显示多少条', required: false })
  pageSize: number;
  @ApiProperty({ description: '页码', required: false })
  pageNum: number;
}
