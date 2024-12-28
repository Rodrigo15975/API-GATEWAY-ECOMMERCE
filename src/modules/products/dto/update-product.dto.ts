import { PartialType } from '@nestjs/mapped-types'
import { IsOptional } from 'class-validator'

class ProductUpdate {
  @IsOptional()
  product: string
  @IsOptional()
  category: string
  @IsOptional()
  brand: string
  @IsOptional()
  quantity: number
  @IsOptional()
  discount: number
  @IsOptional()
  price: number
  @IsOptional()
  gender: string
  @IsOptional()
  description: string
  @IsOptional()
  minStock: number
  @IsOptional()
  id: number
}

export class UpdateProductDto extends PartialType(ProductUpdate) {
  id: number
}
