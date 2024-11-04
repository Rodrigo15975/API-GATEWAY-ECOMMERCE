import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom, lastValueFrom } from 'rxjs'
import {
  USER_FIND_ALL_READ,
  USER_FIND_ONE_READ,
} from './common/patternNameRead/patterNameRead'
import {
  USER_CREATE,
  USER_REMOVE,
  USER_UPDATE,
} from './common/patternNameWrite/patternNameWrite'
import { proxyName } from './common/proxyName/proxyName'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
@Injectable()
export class UserService {
  constructor(
    @Inject(proxyName.name_write) private readonly userClient: ClientProxy,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return await firstValueFrom(
      this.userClient.send(USER_CREATE, createUserDto),
    )
  }

  async findAll() {
    try {
      return await lastValueFrom(this.userClient.send(USER_FIND_ALL_READ, {}))
    } catch (error) {
      return new InternalServerErrorException(error)
    }
  }

  async getProfile() {
    
  }

  async findOne(id: number) {
    return await firstValueFrom(this.userClient.send(USER_FIND_ONE_READ, id))
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await lastValueFrom(
      this.userClient.send(USER_UPDATE, { ...updateUserDto, id }),
    )
  }

  async remove(id: number) {
    return await firstValueFrom(this.userClient.send(USER_REMOVE, id))
  }
}
