import { IsOptional } from 'class-validator'

export class CreateClientDto {
  @IsOptional()
  name: string
}
