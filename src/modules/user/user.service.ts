import { Inject, Injectable, Logger } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom, lastValueFrom, timeout } from 'rxjs'
import { ErrorHandlerService } from 'src/common/error-handler.service'
import { handleObservableError } from 'src/common/handleObservableError'
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
        this.userClient
          .send(USER_CREATE, createUserDto)
          .pipe(timeout(5000), handleObservableError(UserService.name)),
      )
    } catch (error) {
      this.logger.error(error)
      throw ErrorHandlerService.handleError(error, UserService.name)
    }
  }

  async findAll() {
    try {
      return await lastValueFrom(
        this.userClient
          .send(USER_FIND_ALL_READ, {})
          .pipe(timeout(5000), handleObservableError(UserService.name)),
      )
    } catch (error) {
      this.logger.error(error)
      throw ErrorHandlerService.handleError(error, UserService.name)
    }
  }

  async findOne(id: number) {
    try {
      return await firstValueFrom(this.userClient.send(USER_FIND_ONE_READ, id))
    } catch (error) {
      this.logger.error(error)
      throw ErrorHandlerService.handleError(error, UserService.name)
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await lastValueFrom(
        this.userClient
          .send(USER_UPDATE, { ...updateUserDto, id })
          .pipe(timeout(5000), handleObservableError(UserService.name)),
      )
    } catch (error) {
      this.logger.error(error)
      throw ErrorHandlerService.handleError(error, UserService.name)
    }
  }

  async remove(id: number) {
    try {
      return await firstValueFrom(
        this.userClient
          .send(USER_REMOVE, id)
          .pipe(timeout(5000), handleObservableError(UserService.name)),
      )
    } catch (error) {
      this.logger.error(error)
      throw ErrorHandlerService.handleError(error, UserService.name)
    }
  }
}
