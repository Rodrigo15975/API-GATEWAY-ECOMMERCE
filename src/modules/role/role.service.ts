import { Inject, Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { proxyName } from './common/proxyName/proxyName'
import { ClientProxy } from '@nestjs/microservices'
import { ROLE_CREATE } from './common/patternNameWrite/patternNameWrite'
import { ROLE_GET_ALL } from './common/patternNameRead/patterNameRead'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class RoleService {
  constructor(
    @Inject(proxyName.name) private readonly roleClient: ClientProxy,
  ) {}
  create(createRoleDto: CreateRoleDto) {
    return this.roleClient.send(ROLE_CREATE, createRoleDto)
  }

  async findAll() {
    return await lastValueFrom(this.roleClient.send(ROLE_GET_ALL, {}))
  }
}
