import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  dni: string
  @IsNotEmpty()
  password: string
  @IsNotEmpty()
  lastname: string
  @IsNotEmpty()
  name: string
  @IsNotEmpty()
  phone: string
  @IsNotEmpty()
  user_active: boolean

  @IsNotEmpty()
  role: string

  @IsOptional()
  auditoria: {
    phone: string
    avatar?: string
    role: string
    name: string
    lastname: string
  }
}
