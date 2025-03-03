import { HttpService } from '@nestjs/axios'
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  // Inject,
  Injectable,
  Logger,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MemoryStoredFile } from 'nestjs-form-data'
import { firstValueFrom, lastValueFrom } from 'rxjs'
import { CreateProductDto } from '../../products/dto/create-product.dto'
import { ClientProxy } from '@nestjs/microservices'
import { proxyName } from '../../products/common/proxyName'
import { PRODUCTS_GET_ALL_READ } from '../../products/common/patternRead'
import { ProductDto, ProductVariantDto } from '../../products/types/products'
@Injectable()
export class ImagesService {
  private readonly logger: Logger = new Logger(ImagesService.name)
  private readonly apiMicroservicesFiles: string = ''
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(proxyName.name) private readonly clientProducts: ClientProxy,
  ) {
    this.apiMicroservicesFiles = this.configService.getOrThrow(
      'API_MICROSERVICES_FILES',
    )
  }
  private async findProductAll() {
    try {
      return await lastValueFrom(
        this.clientProducts.send<ProductFindAll[], object>(
          PRODUCTS_GET_ALL_READ,
          {},
        ),
      )
    } catch (error) {
      this.logger.error(error.message, error)
      throw new HttpException(
        error.message ||
          `Products gettings errors in API-GATEWAY-${ImagesService.name} `,
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async create(createImageDto: CreateProductDto) {
    const { products } = createImageDto

    try {
      this.logger.log('Send Data to Microservices-Files')

      const productPromises = products.map((productCreating) =>
        this.processProduct(productCreating),
      )
      await Promise.all(productPromises)
      this.logger.log('All files have been uploaded successfully.')
      return createImageDto
    } catch (error) {
      this.logger.error(error.message, error)
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
  private async processProduct(productCreating: ProductDto) {
    const product_DB_READ = await this.findProductAll()
    const { product } = productCreating
    if (this.findExistingProduct(product_DB_READ, product)) return

    const variantPromises = productCreating.productVariant.map((variant) =>
      this.uploadVariantImage(productCreating.category, variant),
    )

    await Promise.all(variantPromises)
  }

  private findExistingProduct(
    products: ProductFindAll[],
    productName: string,
  ): boolean {
    return products.some((product) => product.product === productName)
  }

  async uploadVariantImage(category: string, variant: ProductVariantDto) {
    if (!variant.image?.buffer)
      throw new BadRequestException("Image doesn't exist, buffer is NULL", {
        cause: variant.image,
      })

    const image = variant.image.buffer
    const blob = new Blob([image], { type: variant.image?.mimetype })

    const form = new FormData()
    form.append('image', blob)

    const { data } = await firstValueFrom(
      this.httpService.post<{ url: string }>(
        `${this.apiMicroservicesFiles}/files/${category}`,
        form,
      ),
    )
    const key_url = this.getKeyUrl(data.url)

    variant.image = null as unknown as MemoryStoredFile
    variant.url = data.url
    variant.key_url = key_url

    return variant
  }
  private getKeyUrl(url: string) {
    return url.split('com/')[1]
  }
}
