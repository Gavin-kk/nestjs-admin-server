import { Classify } from '../../entities/Classify';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class ClassifyService {
  constructor(
    @InjectRepository(Classify)
    private readonly classifyRepository: Repository<Classify>,
  ) {}

  // async findAllCategory(pageSize: number, pageNum: number) {
  async findAllCategory() {
    // const result = await this.classifyRepository.query(`
    //    select p.id, p.parent_id, p.category_name, p.createAt, p.updateAt,
    // ( select json_arrayagg(json_object(
    //     'parent_category',classify.parent_id,
    //     'id',classify.id,
    //     'name',classify.category_name,
    //     'createAt',UNIX_TIMESTAMP(classify.createAt),
    //     'updateAt',UNIX_TIMESTAMP(classify.updateAt)
    //     )) from classify where classify.parent_id is not null and classify.parent_id = p.id
    // ) as secondary_classification
    // from classify as p JOIN classify on p.id = classify.parent_id  group by p.category_name LIMIT ${pageSize} OFFSET ${
    //   (pageNum - 1) * pageSize
    // }
    // `);
    // result.forEach((item) => {
    //   item.secondary_classification = JSON.parse(item.secondary_classification);
    // });
    return this.classifyRepository.find({ parentId: null });
  }

  async findCategory(id: number) {
    const sql = `select id,parent_id,category_name,createAt,updateAt,
        (select JSON_ARRAYAGG(
            JSON_OBJECT(
                'parent_category',parent_id,
                'id',classify.id,
                'name',classify.category_name,
                'createAt',UNIX_TIMESTAMP(classify.createAt),
                'updateAt',UNIX_TIMESTAMP(classify.updateAt)
                )
            ) from classify where parent_id = ${id}) as secondary_classification
    from classify where id = ${id}`;
    const [result] = await this.classifyRepository.query(sql);
    if (result) {
      result.secondary_classification = JSON.parse(
        result.secondary_classification,
      );
    }
    return result;
  }

  async addClassify(classify: Classify) {
    const { categoryName } = classify;
    // 验证分类名是否存在
    const doesItExist = await this.classifyRepository.findOne({ categoryName });
    if (doesItExist) {
      throw new HttpException(
        { status: 400, msg: '分类已存在,请勿重复创建' },
        400,
      );
    }
    return this.classifyRepository.save(classify);
  }

  async updateClassify(classify: Classify) {
    const { parentId, categoryName } = classify;
    // 查询数据库中是否存在该分类名
    const result = await this.classifyRepository.findOne({ categoryName });
    if (result) {
      throw new HttpException({ code: 400, message: '已存在分类名' }, 400);
    }
    return this.classifyRepository.update({ id: parentId }, { categoryName });
  }

  async finOneClassify(id: number) {
    return this.classifyRepository
      .createQueryBuilder()
      .select()
      .where('parent_id = :id', { id })
      .getMany();
  }

  // 获取所有父级分类列表
  async findParentList() {
    return this.classifyRepository
      .createQueryBuilder('classifya')
      .select()
      .where('classifya.parent_id is null')
      .getMany();
  }

  // 删除分类
  async deleteClassify(id: number) {
    if (!id) {
      throw new HttpException({ code: 400, message: '请传入id' }, 400);
    }
    return this.classifyRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
