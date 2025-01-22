import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateClientDto {
  @IsOptional()
  name: string
}

export class CreateReview {
  @IsOptional()
  id?: string

  @IsNotEmpty({
    message: 'Rating is required',
  })
  rating: number
  @IsNotEmpty({
    message: 'Comments is required',
  })
  comments: string
  @IsNotEmpty({
    message: 'Username is required',
  })
  username: string

  @IsNotEmpty({
    message: 'UserId is required',
  })
  userId: string

  @IsNotEmpty({
    message: 'UserId is required',
  })
  productId: number
}
