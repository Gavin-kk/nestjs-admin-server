import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClassifyService } from './classify.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AddClassifyDto } from './dto/add-classify.dto';
import { UpdateClassifyDto } from './dto/update-classify.dto';
import { ChildClassifyDto } from './dto/child-classify.dto';

@Controller('classify')
@ApiTags('分类模块')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ClassifyController {
  constructor(private readonly classifyService: ClassifyService) {}

  @Get('list')
  @ApiOperation({ summary: '获取所有父分类' })
  // async getClassIfyList(@Query() listDto: ListDto) {
  async getClassIfyList() {
    // const { pageNum, pageSize } = listDto;
    // return this.classifyService.findAllCategory(pageSize, pageNum);
    return this.classifyService.findAllCategory();
  }

  @Get('list:id')
  @ApiOperation({ summary: '通过父分类id获取父分类的分类及其子类' })
  async getCategory(@Param('id') id: number) {
    return this.classifyService.findCategory(id);
  }

  @Post('add')
  @ApiOperation({ summary: '添加分类' })
  async add(@Body() addClassifyDto: AddClassifyDto) {
    return this.classifyService.addClassify(addClassifyDto);
  }

  @Put('update')
  @ApiOperation({ summary: '更新分类名称' })
  async update(@Body() updateClassifyDto: UpdateClassifyDto) {
    return this.classifyService.updateClassify(updateClassifyDto);
  }

  @Get('parent')
  @ApiOperation({ summary: '获取所有父分类列表' })
  getParentList() {
    return this.classifyService.findParentList();
  }

  @Get('child')
  @ApiOperation({ summary: '根据父分类id获取子分类列表' })
  getOneClassify(@Query() query: ChildClassifyDto) {
    const { id } = query;
    return this.classifyService.finOneClassify(id);
  }

  @Delete('delete')
  @ApiOperation({ summary: '删除分类' })
  deleteClassify(@Query('id') id: number) {
    return this.classifyService.deleteClassify(id);
  }
}
