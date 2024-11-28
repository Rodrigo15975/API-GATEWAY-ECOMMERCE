import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator'
import {
  MemoryStoredFile,
  HasMimeType,
  IsFile,
  MaxFileSize,
} from 'nestjs-form-data'

export class ProductVariantDto {
  @IsNotEmpty({ message: 'Color is required' })
  @IsString({ message: 'Color must be a string' })
  color: string

  @ApiProperty({ type: 'binary' })
  @IsFile({ message: 'The file must be an archive' })
  @MaxFileSize(1e6, { message: 'The maximum allowed size is 1MB' })
  @HasMimeType(['image/jpeg', 'image/png'], {
    message: 'Only JPEG or PNG images are allowed',
  })
  image: MemoryStoredFile

  url?: string
}

export class ProductInventoryDto {
  @IsNotEmpty({ message: 'Minimum stock is required' })
  @Transform(({ value }) => parseInt(value, 10)) // Transform string to number
  @IsNumber({}, { message: 'minStock must be a number' })
  @Min(0, { message: 'minStock must be at least 0' })
  minStock: number

  @IsNotEmpty({ message: 'Stock is required' })
  @Transform(({ value }) => value === 'true') // Transform string to boolean
  @IsBoolean({ message: 'Stock must be a boolean' })
  stock: boolean
}

export class ProductDto {
  @IsNotEmpty({ message: 'Product name is required' })
  @IsString({ message: 'Product name must be a string' })
  product: string

  @IsArray({ message: 'Product variants are required' })
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDto)
  productVariant: ProductVariantDto[]

  @IsNotEmpty({ message: 'Price is required' })
  @Transform(({ value }) => parseFloat(value)) // Transform string to number
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price must be at least 0' })
  price: number

  @IsArray({ message: 'Product sizes are required' })
  @IsString({ each: true, message: 'Each size must be a string' })
  size: string[]

  @IsNotEmpty({ message: 'Gender is required' })
  @IsString({ message: 'Gender must be a string' })
  gender: string

  @IsNotEmpty({ message: 'Brand is required' })
  @IsString({ message: 'Brand must be a string' })
  brand: string

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string

  @IsNotEmpty({ message: 'Quantity is required' })
  @Transform(({ value }) => parseInt(value, 10)) // Transform string to number
  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(0, { message: 'Quantity must be at least 0' })
  quantity: number

  @IsNotEmpty({ message: 'Is_new is required' })
  @Transform(({ value }) => value === 'true') // Transform string to boolean
  @IsBoolean({ message: 'Is_new must be a boolean' })
  is_new: boolean

  @IsNotEmpty({ message: 'Category is required' })
  @IsString({ message: 'Category must be a string' })
  category: string

  @IsNotEmpty({ message: 'Discount is required' })
  @Transform(({ value }) => parseFloat(value)) // Transform string to number
  @IsNumber({}, { message: 'Discount must be a number' })
  @Min(0, { message: 'Discount must be at least 0' })
  @Max(100, { message: 'Discount cannot exceed 100' })
  discount: number

  @ValidateNested()
  @Type(() => ProductInventoryDto)
  productInventory: ProductInventoryDto
}
