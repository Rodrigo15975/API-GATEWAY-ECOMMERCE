import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreatePaymentDto {
  @IsOptional()
  id?: number

  @IsNotEmpty()
  quantity_buy: number

  @IsNotEmpty()
  brand: string

  @IsNotEmpty()
  category?: {
    id: number
    category: string
  }

  @IsOptional()
  createdAt?: string

  @IsOptional()
  description?: string

  @IsOptional()
  discount?: number

  @IsNotEmpty()
  gender?: string

  @IsOptional()
  is_new?: boolean

  @IsOptional()
  price?: number

  @IsNotEmpty()
  product?: string

  @IsNotEmpty()
  productVariant?: Array<{
    id: number
    color: string
    url: string
    key_url: string
  }>

  @IsOptional()
  productInventory?: {
    id: number
    minStock: number
    productsId: number
    stock: boolean
  }

  @IsOptional()
  quantity?: number

  @IsOptional()
  total_sold?: number

  @IsNotEmpty()
  size?: string[]

  @IsOptional()
  comments?: string

  @IsNotEmpty()
  username?: string

  @IsNotEmpty()
  verified?: boolean

  @IsOptional()
  post?: Array<{
    countRating: { rating: number }
    countUserId: { userId: number }
    totalRating: { totalRating: number }
  }>
}
