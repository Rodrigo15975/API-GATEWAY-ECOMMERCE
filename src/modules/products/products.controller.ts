import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiHeader,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { FormDataRequest } from 'nestjs-form-data'
import {
  ADMIN,
  DEV,
  EMPLOYEE,
  RolesDefault,
} from 'src/decorators/role.decorator'
import { RolesGuard } from 'src/guards/roles.guard'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductsService } from './products.service'
import { ProductDto, ProductVariantDto } from './types/products'

@ApiTags('microservice-products')
@ApiCookieAuth('microservice-products')
@UseGuards(RolesGuard)
@RolesDefault([ADMIN, DEV, EMPLOYEE])
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new product from a list of products',
    type: CreateProductDto,
    isArray: true,
  })
  @ApiHeader({
    name: 'Product',
    description: 'Product Data',
    allowEmptyValue: true,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Product creating successfully',
  })
  @Post()
  @FormDataRequest()
  create(@Body() data: CreateProductDto) {
    return this.productsService.create(data)
  }

  @Post('one-variant/:id/:categorie')
  @FormDataRequest()
  createOneVariant(
    @Param('id') id: string,
    @Body() data: ProductVariantDto,
    @Param('categorie') categorie: string,
  ) {
    return this.productsService.createOneVariant(+id, data, categorie)
  }
  @Post('size/:id')
  createOneSize(@Param('id') id: string, @Body() size: string[]) {
    return this.productsService.createSizes(+id, size)
  }

  @ApiConsumes('application/json')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all products',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    isArray: true,
    type: ProductDto,
  })
  @Get()
  findAll() {
    return this.productsService.findAll()
  }
  @Get('client')
  findAllClient() {
    return this.productsService.findAllClient()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id)
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product updating successfully',
  })
  @ApiBody({
    type: UpdateProductDto,
    required: true,
  })
  @ApiHeader({
    name: 'Product',
    description: 'Product Data',
    allowEmptyValue: true,
    required: true,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto)
  }

  @ApiOkResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Product deleting successfully',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id)
  }
  @ApiOkResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Product size deleting successfully',
  })
  @Delete('size/:id/:size')
  removeOneSize(@Param('id') id: string, @Param('size') sizeToRemove: string) {
    return this.productsService.removeOneSize(+id, sizeToRemove)
  }

  @ApiOkResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Product url deleting successfully',
  })
  @Delete()
  removeUrl(@Query('key') key: string) {
    return this.productsService.removeUrl(key)
  }
}
