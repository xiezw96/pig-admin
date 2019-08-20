import axios from 'axios';

import { GoodsCategoryEntity } from '@/entities';

import { CreateCategoryDto } from './create-category.dto';
import { FindCategoriesDto } from './find-categories.dto';

export class CategoryService {
  async find(dto?: FindCategoriesDto) {
    const { data } = await axios.get<GoodsCategoryEntity[]>(
      'api/admin/goodscategory/list',
      {
        params: dto,
      },
    );
    return data;
  }

  async create(dto: CreateCategoryDto) {
    await axios.post('api/admin/goodscategory', dto);
  }

  async update(id: number, dto: CreateCategoryDto) {
    await axios.put('api/admin/goodscategory', { id, ...dto });
  }

  async remove(id: number) {
    await axios.delete(`api/admin/goodscategory/${id}`);
  }
}

export const categoryService = new CategoryService();
