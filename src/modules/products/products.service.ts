import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { proxyName } from './common/proxyName'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { PRODUCTS_CREATE } from './common/patternWrite'

@Injectable()
export class ProductsService {
  private readonly logger: Logger = new Logger(ProductsService.name)
  constructor(
    @Inject(proxyName.name) private readonly clientProducts: ClientProxy,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      return await firstValueFrom(
        this.clientProducts.send(PRODUCTS_CREATE, createProductDto),
      )
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException(error)
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
