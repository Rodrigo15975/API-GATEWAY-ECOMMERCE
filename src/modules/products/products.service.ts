import { Inject, Injectable, Logger } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom, timeout } from 'rxjs'
import { ErrorHandlerService } from 'src/common/error-handler.service'
import { PRODUCTS_CREATE } from './common/patternWrite'
import { proxyName } from './common/proxyName'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { handleObservableError } from 'src/common/handleObservableError'
// import { ImagesService } from './services/image.service'

@Injectable()
export class ProductsService {
  private readonly logger: Logger = new Logger(ProductsService.name)
  constructor(
    @Inject(proxyName.name) private readonly clientProducts: ClientProxy,
    // private readonly imagesServices: ImagesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      this.logger.log('Send data to create a product in the DB WRITE....')
      // por ahora que no haga eso
      // const dataWithUrls = this.imagesServices.create(createProductDto)
      return await firstValueFrom(
        this.clientProducts
          .send(PRODUCTS_CREATE, createProductDto)
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

  findAll() {
    return `This action returns all products`
  }

  findOne(id: number) {
    return `This action returns a #${id} product`
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    console.log(updateProductDto)

    return `This action updates a #${id} product`
  }

  remove(id: number) {
    return `This action removes a #${id} product`
  }
}
