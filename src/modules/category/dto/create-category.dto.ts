import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator'

export class CreateCategoryDto {
  @IsNotEmpty()
  category: string

  @IsOptional()
  id: number
}

export class CreateCategoryManyDto {
  categories: CreateCategoryDto[]
}

export class CreateDiscountRulesCategory {
  @IsNotEmpty()
  discount: number

  @IsNotEmpty()
  @IsDateString()
  start_date: string

  @IsNotEmpty()
  @IsDateString()
  end_date: string

  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean

  @IsOptional()
  categoryId: number

  @IsOptional()
  id: number
}
