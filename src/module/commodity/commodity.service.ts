import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Goods } from '../../entities/Goods';
import {
  InsertResult,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { ClassifyGoods } from '../../entities/ClassifyGoods';
import { AddGoodsDto } from './dto/add-goods.dto';
import { UpdateGoodsDto } from './dto/update-goods.dto';
import { Classify } from '../../entities/Classify';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ListDto } from './dto/list.dto';
import { SearchDto } from './dto/search.dto';
import { PaginationDto } from './dto/pagination.dto';

export type PaginationType = {
  total: number;
  pageSize: number;
  pageNum: number;
  pages: number;
  list: Goods[];
};

@Injectable()
export class CommodityService {
  constructor(
    @InjectRepository(Goods)
    private readonly goodsRepository: Repository<Goods>,
    @InjectRepository(ClassifyGoods)
    private readonly classifyGoodsRepository: Repository<ClassifyGoods>,
    @InjectRepository(Classify)
    private readonly classifyRepository: Repository<Classify>,
  ) {}
  //
  private sql = `select 
              g.id as id,
              g.name as \`name\`,
              g.desc as \`desc\`,
              g.price as price,
              g.imgs as imgs,
              g.\`status\` as \`status\`,
              g.detail as detail,
              unix_timestamp(g.createAt) as createAt,
              unix_timestamp(g.updateAt) as updateAt,
              c.category_name as classifyName
            from goods as g 
            left join classify_goods as cg on g.id = cg.goods_id 
            LEFT JOIN classify as c on c.id = cg.p_classify_id`;

  async getGoodsAndClassify(paginationDto: PaginationDto) {
    const { pageSize, pageNum } = paginationDto;
    let sql = this.sql;

    if (pageSize && pageNum) {
      sql += ` limit ${pageSize} offset ${(pageNum - 1) * pageSize}`;
      const allGoods: Goods[] = await this.goodsRepository.find();
      // ???????????????
      const total: number = allGoods.length;
      const pages: number = Math.ceil(total / pageSize);
      const list = await this.goodsRepository.query(sql);

      return {
        total,
        pageSize,
        pageNum,
        pages,
        list,
      };
    } else {
      return await this.goodsRepository.query(sql);
    }
  }

  async getProductDetails(id: number) {
    if (!id) {
      throw new HttpException({ code: 400, message: 'id????????????' }, 400);
    }
    const sql = this.sql + ` where g.id = ${id}`;
    const detail = await this.goodsRepository.query(sql);
    console.log(detail);
    if (!detail.length) {
      throw new HttpException({ code: 400, message: '???????????????' }, 400);
    }
    detail[0].classifyName = await this.getGoodsClassify(
      detail[0].classifyName,
    );
    return detail;
  }

  private async getGoodsClassify(
    classifyName: string,
  ): Promise<{ name: string; id: number }[]> {
    const resultArr: { name: string; id: number }[] = [];
    const recursion = async (data: Classify) => {
      if (data.parentId) {
        resultArr.unshift({ name: data.categoryName, id: data.id });
        return recursion(
          await this.classifyRepository.findOne({ id: data.parentId }),
        );
      }
      return resultArr.unshift({ name: data.categoryName, id: data.id });
    };
    const result: Classify = await this.classifyRepository.findOne({
      categoryName: classifyName,
    });

    await recursion(result);
    return resultArr;
  }

  async findAllGoods(getListDto: ListDto): Promise<{
    total: number;
    pageSize: number;
    pageNum: number;
    pages: number;
    list: Goods[];
  }> {
    const { pageSize, pageNum } = getListDto;
    const result: Goods[] = await this.goodsRepository.find();
    // ???????????????
    const total: number = result.length;
    const pages: number = Math.ceil(total / pageSize);

    const list: Goods[] = await this.goodsRepository
      .createQueryBuilder()
      .limit(pageSize)
      .offset((pageNum - 1) * pageSize)
      .getMany();
    return {
      total,
      pageSize,
      pageNum,
      pages,
      list,
    };
  }

  async addGoods(
    goods: AddGoodsDto,
  ): Promise<{ save: AddGoodsDto & Goods; saveRelationship: InsertResult }> {
    // ?????????eid
    const { classifyId } = goods;
    // ????????????????????????
    const whetherThereIsClassify = await this.classifyRepository.findOne({
      id: classifyId,
    });
    if (!whetherThereIsClassify) {
      throw new HttpException({ status: 404, msg: '????????????id?????????' }, 400);
    }
    const save: AddGoodsDto & Goods = await this.goodsRepository.save(goods);
    // ?????????id
    const { id } = save;

    // ????????????id????????????id???????????????????????????????????????
    const saveRelationship: InsertResult = await this.classifyGoodsRepository
      .createQueryBuilder()
      .insert()
      .into(ClassifyGoods)
      .values([{ goodsId: id, pClassifyId: classifyId }])
      .execute();
    return { save, saveRelationship };
  }

  async updateGoods(updateGoodsDto: UpdateGoodsDto): Promise<UpdateResult> {
    const { id } = updateGoodsDto;
    // return this.goodsRepository
    //   .createQueryBuilder()
    //   .update()
    //   .where('id = :id',{id:goodsId})
    return this.goodsRepository.update({ id }, updateGoodsDto);
  }

  async updateStatus(statusDto: UpdateStatusDto): Promise<UpdateResult> {
    const { status, productId } = statusDto;

    // ??????id????????????
    const isExists = await this.goodsRepository.findOne({ id: productId });

    if (!isExists) {
      throw new HttpException({ status: 400, msg: 'id?????????' }, 400);
    }
    return await this.goodsRepository
      .createQueryBuilder()
      .update()
      .set({ status })
      .where('id = :id', { id: productId })
      .execute();
  }

  async search(searchDto: SearchDto): Promise<SelectQueryBuilder<Goods[]>> {
    const content: string = searchDto.content;
    const pageSize: number = searchDto.pageSize;
    const pageNum: number = searchDto.pageNum;

    return this.goodsRepository
      .createQueryBuilder('ss')
      .select()
      .where('concat(ss.name,ss.desc) like :name ', {
        name: `%${content}%`,
      })
      .limit(pageSize || 5)
      .offset((pageNum - 1 || 0) * pageSize)
      .execute();
  }

  // private getProductClassificationRelationship(): string {
  //   return;
  // }
}
