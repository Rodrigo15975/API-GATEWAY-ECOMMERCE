import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
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
  private readonly logger: Logger = new Logger(UserService.name)
  constructor(
    @Inject(proxyName.name_write) private readonly userClient: ClientProxy,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      return await firstValueFrom(
        this.userClient.send(USER_CREATE, createUserDto),
      )
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async findAll() {
    try {
      return await lastValueFrom(this.userClient.send(USER_FIND_ALL_READ, {}))
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async findOne(id: number) {
    try {
      return await firstValueFrom(this.userClient.send(USER_FIND_ONE_READ, id))
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await lastValueFrom(
        this.userClient.send(USER_UPDATE, { ...updateUserDto, id }),
      )
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async remove(id: number) {
    try {
      return await firstValueFrom(this.userClient.send(USER_REMOVE, id))
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
