import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { RoleService } from './role.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('microservicio-role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto)
  }

  @Get()
  findAll() {
    return this.roleService.findAll()
  }
}
