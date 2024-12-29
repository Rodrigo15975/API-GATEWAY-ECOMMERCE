import { OmitType, PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'
import { IsOptional } from 'class-validator'

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['role']),
) {
  @IsOptional()
  id: number

  @IsOptional()
  role: {
    role: string
  }
}
