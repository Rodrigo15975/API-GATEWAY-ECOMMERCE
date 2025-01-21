import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateClientDto {
  @IsOptional()
  name: string
}

export class CreateReview {
  @IsOptional()
  id?: number
  @IsNotEmpty({
    message: 'Rating is required',
  })
  rating: number
  @IsNotEmpty({
    message: 'Review is required',
  })
  review: string
  @IsOptional()
  productId: number
  @IsOptional()
  userId: number
}
