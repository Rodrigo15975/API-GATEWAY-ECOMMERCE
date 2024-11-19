import { Inject, Injectable, Logger } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { proxyName } from './common/proxyName/proxyName'
import { ClientProxy } from '@nestjs/microservices'
import { ROLE_CREATE } from './common/patternNameWrite/patternNameWrite'
import { ROLE_GET_ALL } from './common/patternNameRead/patterNameRead'
import { firstValueFrom, lastValueFrom } from 'rxjs'

@Injectable()
export class RoleService {
  private readonly logger: Logger = new Logger(RoleService.name)
  constructor(
    @Inject(proxyName.name) private readonly roleClient: ClientProxy,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    try {
      return await firstValueFrom(
        this.roleClient.send(ROLE_CREATE, createRoleDto),
      )
    } catch (error) {
      this.logger.error(error)
    }
  }

  async findAll() {
    try {
      return await lastValueFrom(this.roleClient.send(ROLE_GET_ALL, {}))
    } catch (error) {
      this.logger.error(error)
    }
  }
}
