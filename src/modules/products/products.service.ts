import { Inject, Injectable, Logger } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom, timeout } from 'rxjs'
import { ErrorHandlerService } from 'src/common/error-handler.service'
import { handleObservableError } from 'src/common/handleObservableError'
import { PRODUCTS_GET_ALL_READ, PRODUCTS_GET_ONE } from './common/patternRead'
import {
  PRODUCTS_CREATE,
  PRODUCTS_CREATE_ONE_VARIANT,
  PRODUCTS_CREATE_SIZE,
  PRODUCTS_REMOVE,
  PRODUCTS_REMOVE_SIZE,
  PRODUCTS_REMOVE_URL,
  PRODUCTS_UPDATE,
} from './common/patternWrite'
import { proxyName } from './common/proxyName'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ImagesService } from './services/image.service'
import { CreateOneVariant, ProductVariantDto } from './types/products'

@Injectable()
export class ProductsService {
  private readonly logger: Logger = new Logger(ProductsService.name)
  constructor(
    @Inject(proxyName.name) private readonly clientProducts: ClientProxy,
    private readonly imagesServices: ImagesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      this.logger.log('Send data to create a product in the DB WRITE....')
      const dataWithUrls = await this.imagesServices.create(createProductDto)
      return await firstValueFrom(
        this.clientProducts
          .send(PRODUCTS_CREATE, dataWithUrls)
          .pipe(timeout(5000), handleObservableError(ProductsService.name)),
      )
    } catch (error) {
      this.logger.error(
        'Error send data  in ProductsService CREATE method',
        error,
      )
      throw ErrorHandlerService.handleError(error, ProductsService.name)
    }
  }
  async createSizes(id: number, size: string[]) {
    try {
      this.logger.log('Send data to create size a product in the DB WRITE....')
      return await firstValueFrom(
        this.clientProducts
          .send(PRODUCTS_CREATE_SIZE, { id, size })
          .pipe(timeout(5000), handleObservableError(ProductsService.name)),
      )
    } catch (error) {
      this.logger.error(
        'Error send data size  in ProductsService CREATE method',
        error,
      )
      throw ErrorHandlerService.handleError(error, ProductsService.name)
    }
  }

  async findAll() {
    try {
      // El segundo argumento es un objeto de configuración opcional.
      return await firstValueFrom(
        this.clientProducts
          .send<ProductFindAll[]>(PRODUCTS_GET_ALL_READ, {})
          .pipe(timeout(5000), handleObservableError(ProductsService.name)),
      ).then((data: ProductFindAll[]) => data)
    } catch (error) {
      this.logger.error('Error get all PRODUCTS IN DB-READ', error)
      throw ErrorHandlerService.handleError(error, ProductsService.name)
    }
  }

  async findOne(id: number) {
    try {
      return await firstValueFrom(
        this.clientProducts
          .send<ProductFindAll>(PRODUCTS_GET_ONE, id)
          .pipe(timeout(5000), handleObservableError(ProductsService.name)),
      )
    } catch (error) {
      this.logger.error(`Error get one WITH ID ${id} PRODUCT IN DB-READ`, error)
      throw ErrorHandlerService.handleError(error, ProductsService.name)
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      return await firstValueFrom(
        this.clientProducts
          .send(PRODUCTS_UPDATE, { ...updateProductDto, id })
          .pipe(timeout(5000), handleObservableError(ProductsService.name)),
      )
    } catch (error) {
      this.logger.error('Error update PRODUCT IN DB-WRITE', error)
      throw ErrorHandlerService.handleError(error, ProductsService.name)
    }
  }

  async remove(id: number) {
    try {
      return await firstValueFrom(
        this.clientProducts
          .send(PRODUCTS_REMOVE, id)
          .pipe(timeout(5000), handleObservableError(ProductsService.name)),
      )
    } catch (error) {
      this.logger.error('Error remove PRODUCT IN DB-WRITE', error)
      throw ErrorHandlerService.handleError(error, ProductsService.name)
    }
  }
  async createOneVariant(
    id: number,
    data: ProductVariantDto,
    categorie: string,
  ) {
    const newVariant = await this.imagesServices.uploadVariantImage(
      categorie,
      data,
    )

    try {
      return await firstValueFrom<string, CreateOneVariant>(
        this.clientProducts.send<string, CreateOneVariant>(
          PRODUCTS_CREATE_ONE_VARIANT,
          { ...newVariant, id },
        ),
        {
          defaultValue: {
            color: '',
            id: 0,
            url: '',
            image: null,
            key_url: '',
          },
        },
      )
    } catch (error) {
      this.logger.error(
        'Error creating One Variant of PRODUCT IN DB-WRITE',
        error,
      )
      throw ErrorHandlerService.handleError(error, ProductsService.name)
    }
  }

  async removeUrl(key: string) {
    try {
      return await firstValueFrom(
        this.clientProducts
          .send(PRODUCTS_REMOVE_URL, key)
          .pipe(timeout(5000), handleObservableError(ProductsService.name)),
      )
    } catch (error) {
      this.logger.error('Error remove PRODUCT IN DB-WRITE', error)
      throw ErrorHandlerService.handleError(error, ProductsService.name)
    }
  }

  async removeOneSize(id: number, sizeToRemove: string) {
    try {
      return await firstValueFrom(
        this.clientProducts
          .send(PRODUCTS_REMOVE_SIZE, { id, sizeToRemove })
          .pipe(timeout(5000), handleObservableError(ProductsService.name)),
      )
    } catch (error) {
      this.logger.error('Error remove ONE-SIZE-PRODUCT IN DB-WRITE', error)
      throw ErrorHandlerService.handleError(error, ProductsService.name)
    }
  }
}
