import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
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
  createCuponIfClientNotExists(
    @Param('idGoogle') idGoogle: string,
    @Query('emailGoogle') emailGoogle: string,
    @Query('nameGoogle') nameGoogle: string,
  ) {
    return this.clientsService.createCuponIfUserNotExists(
      idGoogle,
      emailGoogle,
      nameGoogle,
    )
  }

  @Get()
  findAll() {
    return this.clientsService.findAll()
  }
  @Get(':idGoogle')
  findOne(@Param('idGoogle') idGoogle: string) {
    return this.clientsService.findOne(idGoogle)
  }

  @Get('verify/:idGoogle')
  findOneVerify(
    @Param('idGoogle') idGoogle: string,
    @Query('verify') verify: boolean,
  ) {
    return this.clientsService.findOneVerify(idGoogle, verify)
  }
}
