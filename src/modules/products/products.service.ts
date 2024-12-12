import { Inject, Injectable, Logger } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom, timeout } from 'rxjs'
import { ErrorHandlerService } from 'src/common/error-handler.service'
import { handleObservableError } from 'src/common/handleObservableError'
import { PRODUCTS_GET_ALL_READ } from './common/patternRead'
import { PRODUCTS_CREATE, PRODUCTS_REMOVE } from './common/patternWrite'
import { proxyName } from './common/proxyName'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ImagesService } from './services/image.service'

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

  async findAll() {
    try {
      return await firstValueFrom(
        this.clientProducts
          .send(PRODUCTS_GET_ALL_READ, {})
          .pipe(timeout(5000), handleObservableError(ProductsService.name)),
      )
    } catch (error) {
      this.logger.error('Error get all PRODUCTS IN DB-READ', error)
      throw ErrorHandlerService.handleError(error, ProductsService.name)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} product`
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    console.log(updateProductDto)

    return `This action updates a #${id} product`
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
}
