import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom, lastValueFrom, timeout } from 'rxjs'
import { CATEGORY_FIND_ALL_READ } from './common/patternRead'
import {
  CATEGORY_CREATE,
  CATEGORY_CREATE_DISCOUNT,
  CATEGORY_CREATE_MANY,
  CATEGORY_DELETE,
  CATEGORY_DELETE_DISCOUNT,
  CATEGORY_UPDATE,
  CATEGORY_UPDATE_DISCOUNT,
} from './common/patternWrite'
import { proxyName } from './common/proxyName'
import {
  CreateCategoryDto,
  CreateCategoryManyDto,
  CreateDiscountRulesCategory,
} from './dto/create-category.dto'
import {
  UpdateCategoryDto,
  UpdateDiscountCategoryDto,
} from './dto/update-category.dto'
import { handleObservableError } from 'src/common/handleObservableError'
import { ErrorHandlerService } from 'src/common/error-handler.service'
@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name)

  constructor(
    @Inject(proxyName.nameWrite)
    private readonly clientProductsWrite: ClientProxy,

    @Inject(proxyName.nameRead)
    private readonly clientProductsRead: ClientProxy,
  ) {}

  async createDiscount(id: number, data: CreateDiscountRulesCategory) {
    try {
      return await firstValueFrom(
        this.clientProductsWrite.send(CATEGORY_CREATE_DISCOUNT, {
          ...data,
          id,
        }),
      )
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await firstValueFrom(
        this.clientProductsWrite.send(CATEGORY_CREATE, createCategoryDto),
      )
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
  async createMany(createCategoryDto: CreateCategoryManyDto) {
    try {
      return await firstValueFrom(
        this.clientProductsWrite.send(CATEGORY_CREATE_MANY, createCategoryDto),
      )
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async findAll(): Promise<FindAllCategory[]> {
    try {
      return firstValueFrom(
        this.clientProductsRead
          .send<
            FindAllCategory[],
            Record<string, unknown>
          >(CATEGORY_FIND_ALL_READ, {})
          .pipe(timeout(5000), handleObservableError(CategoryService.name)),
        { defaultValue: [] as FindAllCategory[] },
      ).then((data: FindAllCategory[]) => data)
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async update(id: number, data: UpdateCategoryDto) {
    try {
      return firstValueFrom(
        this.clientProductsWrite.send(CATEGORY_UPDATE, { ...data, id }),
      )
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
  async updateDiscount(id: number, data: UpdateDiscountCategoryDto) {
    try {
      return firstValueFrom(
        this.clientProductsWrite.send(CATEGORY_UPDATE_DISCOUNT, {
          ...data,
          id,
        }),
      )
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async verifyDiscountOfCategory(data: FindAllCategory) {
    try {
      await this.updateDiscount(data.id, data)
    } catch (error) {
      this.logger.error('error update discount category', error)
      throw ErrorHandlerService.handleError(error, CategoryService.name)
    }
  }

  async removeDiscount(id: number) {
    try {
      return await lastValueFrom(
        this.clientProductsWrite.send(CATEGORY_DELETE_DISCOUNT, id),
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
      return firstValueFrom(this.clientProductsWrite.send(CATEGORY_DELETE, id))
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
