import { IsNotEmpty } from 'class-validator'

export class AuthData {
  @IsNotEmpty()
  phone: string
  @IsNotEmpty()
  password: string
}
