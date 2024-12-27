import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateCouponDto {
  @IsOptional({ message: 'Product is Optional' })
  product: string | null
  @IsNotEmpty({ message: 'code is required' })
  code: string
  @IsNotEmpty({ message: 'discount is required' })
  discount: number
  @IsNotEmpty({ message: 'espiryDate is required' })
  espiryDate: Date
  @IsNotEmpty({ message: 'isGlobal is required' })
  isGlobal: boolean

  @IsBoolean({ message: 'isNew is required' })
  isNew: boolean

  @IsOptional({ message: 'id is optional' })
  id: number
}
