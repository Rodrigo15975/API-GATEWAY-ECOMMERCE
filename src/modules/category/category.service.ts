import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import {
  CATEGORY_CREATE,
  CATEGORY_CREATE_MANY,
  CATEGORY_DELETE,
  CATEGORY_UPDATE,
} from './common/patternWrite'
import { proxyName } from './common/proxyName'
import {
  CreateCategoryDto,
  CreateCategoryManyDto,
} from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { CATEGORY_FIND_ALL_READ } from './common/patternRead'

@Injectable()
export class CategoryService {
  constructor(
    @Inject(proxyName.nameWrite)
    private readonly clientProductsWrite: ClientProxy,

    @Inject(proxyName.nameRead)
    private readonly clientProductsRead: ClientProxy,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await firstValueFrom(
        this.clientProductsWrite.send(CATEGORY_CREATE, createCategoryDto),
      )
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }
  async createMany(createCategoryDto: CreateCategoryManyDto) {
    try {
      return await firstValueFrom(
        this.clientProductsWrite.send(CATEGORY_CREATE_MANY, createCategoryDto),
      )
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    try {
      return firstValueFrom(
        this.clientProductsRead.send(CATEGORY_FIND_ALL_READ, {}),
      )
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: number, data: UpdateCategoryDto) {
    try {
      return firstValueFrom(
        this.clientProductsWrite.send(CATEGORY_UPDATE, { ...data, id }),
      )
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: number) {
    try {
      return firstValueFrom(this.clientProductsWrite.send(CATEGORY_DELETE, id))
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException(error)
    }
  }
}
