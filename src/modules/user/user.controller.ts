import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  // HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiBody, ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  ADMIN,
  DEV,
  EMPLOYEE,
  RolesDefault,
} from 'src/decorators/role.decorator'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'
import { RolesGuard } from 'src/guards/roles.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { GetProfileAhuthInterceptor } from 'src/interceptors/getProfile.auth.interceptor'

@ApiTags('microservice-user')
@UseGuards(RolesGuard)
@RolesDefault([ADMIN, DEV, EMPLOYEE])
@Controller('user')
@ApiCookieAuth('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['username', 'email', 'password'],
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User has been successfully created.',
    type: CreateUserDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }
  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id)
  }

  @UseInterceptors(GetProfileAhuthInterceptor)
  @Get('profile/token')
  getProfile(@Req() req: any) {
    // return req.user;
    return { ...req.user }
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id)
  }
}
