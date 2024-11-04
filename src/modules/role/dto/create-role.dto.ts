import { IsNotEmpty } from 'class-validator'

export class CreateRoleDto {
  @IsNotEmpty({
    message: 'Necesario role',
  })
  role: string
}
