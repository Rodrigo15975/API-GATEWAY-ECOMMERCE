import { PartialType } from '@nestjs/swagger'
import {
  CreateCategoryDto,
  CreateDiscountRulesCategory,
} from './create-category.dto'

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export class UpdateDiscountCategoryDto extends PartialType(
  CreateDiscountRulesCategory,
) {}
