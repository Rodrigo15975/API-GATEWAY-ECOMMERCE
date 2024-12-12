import { Type } from 'class-transformer'
import { IsArray, ValidateNested } from 'class-validator'
import { ProductDto } from '../types/products'

import { ApiProperty } from '@nestjs/swagger'
export class CreateProductDto {
  @ApiProperty({ type: ProductDto })
  @IsArray()
  @ValidateNested({
    each: true,
    message: 'Required data products it is a array',
  })
  @Type(() => ProductDto)
  products: ProductDto[]
}
