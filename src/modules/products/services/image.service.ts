import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { CreateProductDto } from '../dto/create-product.dto'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom } from 'rxjs'
import { MemoryStoredFile } from 'nestjs-form-data'
@Injectable()
export class ImagesService {
  private readonly logger: Logger = new Logger(ImagesService.name)
  private readonly apiMicroservicesFiles: string = ''
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiMicroservicesFiles = this.configService.getOrThrow(
      'API_MICROSERVICES_FILES',
    )
  }
  async create(createImageDto: CreateProductDto) {
    const { products } = createImageDto
    try {
      this.logger.log('Send Data to Microservices-Files')
      const productPromises = products.map(async (product) => {
        const variantPromises = product.productVariant.map(async (variant) => {
          const image = variant.image.buffer

          const blob = new Blob([image], { type: variant.image.mimetype })

          const form = new FormData()
          form.append('image', blob)

          const { data } = await firstValueFrom(
            this.httpService.post<{ url: string }>(
              `${this.apiMicroservicesFiles}/files/${product.category}`,
              form,
            ),
          )
          variant.image = null as unknown as MemoryStoredFile
          variant.url = data.url
        })

        await Promise.all(variantPromises)
      })
      await Promise.all(productPromises)
      this.logger.log('All files have been uploaded successfully.')
      return createImageDto
    } catch (error) {
      this.logger.error(error)
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  update(id: number, updateImageDto: any) {
    console.log(updateImageDto)

    console.log(id)

    return `This action updates a #id `
  }

  remove(id: number) {
    console.log(id)
    return `This action removes a #id `
  }
}
