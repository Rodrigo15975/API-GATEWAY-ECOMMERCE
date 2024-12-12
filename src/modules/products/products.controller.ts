import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
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
import { ProductDto } from './types/products'

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
  uploadProducts(@Body() data: CreateProductDto) {
    return this.productsService.create(data)
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id)
  }
}
