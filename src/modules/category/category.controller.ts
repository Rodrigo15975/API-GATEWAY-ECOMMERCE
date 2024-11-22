import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  // UseFilters,
  // UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import {
  ADMIN,
  DEV,
  EMPLOYEE,
  // EMPLOYEE,
  RolesDefault,
} from 'src/decorators/role.decorator'
// import { RolesGuard } from 'src/guards/roles.guard'
import { CategoryService } from './category.service'
import {
  CreateCategoryDto,
  CreateCategoryManyDto,
  CreateDiscountRulesCategory,
} from './dto/create-category.dto'
import {
  UpdateCategoryDto,
  UpdateDiscountCategoryDto,
} from './dto/update-category.dto'
// import { HttpExceptionFilter } from 'src/common/catch.exception.filter'

@ApiTags('MICROSERVICES-CATEGORY')
@Controller('category')
// @UseFilters(HttpExceptionFilter)
// @UseGuards(RolesGuard)
@RolesDefault([ADMIN, DEV, EMPLOYEE])
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto)
  }
  @Post('many')
  createMany(@Body() createCategoryDto: CreateCategoryManyDto) {
    return this.categoryService.createMany(createCategoryDto)
  }

  @Post('discount/:id')
  createDiscount(
    @Param('id') id: string,
    @Body() createDiscountRulesCategory: CreateDiscountRulesCategory,
  ) {
    return this.categoryService.createDiscount(+id, createDiscountRulesCategory)
  }

  @Get()
  findAll() {
    return this.categoryService.findAll()
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto)
  }
  @Patch('discount/:id')
  updateDiscount(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateDiscountCategoryDto,
  ) {
    return this.categoryService.updateDiscount(+id, updateCategoryDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id)
  }
  @Delete('discount/:id')
  deleteDiscount(@Param('id') id: string) {
    return this.categoryService.removeDiscount(+id)
  }
}
