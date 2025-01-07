import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ClientsService } from './clients.service'
import { CreateClientDto } from './dto/create-client.dto'

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto)
  }

  @Post(':idGoogle')
  createCuponIfClientNotExists(@Param('idGoogle') idGoogle: string) {
    return this.clientsService.createCuponIfUserNotExists(idGoogle)
  }

  @Get()
  findAll() {
    return this.clientsService.findAll()
  }

  @Get('testing')
  testing() {
    return this.clientsService.testingEmail()
  }
}
