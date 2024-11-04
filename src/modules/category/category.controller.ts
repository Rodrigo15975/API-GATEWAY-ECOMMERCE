import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { CategoryService } from './category.service'
import {
  CreateCategoryDto,
  CreateCategoryManyDto,
} from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import {
  ADMIN,
  DEV,
  EMPLOYEE,
  // EMPLOYEE,
  RolesDefault,
} from 'src/decorators/role.decorator'
import { RolesGuard } from 'src/guards/roles.guard'

@Controller('category')
@UseGuards(RolesGuard)
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id)
  }
}
