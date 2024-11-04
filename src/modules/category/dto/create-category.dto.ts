import { IsNotEmpty } from 'class-validator'

export class CreateCategoryDto {
  @IsNotEmpty()
  category: string
}

export class CreateCategoryManyDto {
  categories: CreateCategoryDto[]
}
