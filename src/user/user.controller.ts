import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete 
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    examples: {
      example1: {
        summary: 'Create a user example',
        value: {
          name: '',
          password: 'securepassword',
          role: 'admin',
          restaurantId: 1,
          regionId: 2,
        },
      },
    },
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({
    status: 200,
    description: 'A list of users.',
    examples: {
      example1: {
        summary: 'Example with two users',
        value: [
          {
            id: 1,
            name: 'Alice Smith',
            role: 'manager',
            restaurantId: 3,
            regionId: 5,
          },
          {
            id: 2,
            name: 'Bob Johnson',
            role: 'chef',
            restaurantId: 2,
            regionId: 4,
          },
        ],
      },
    },
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the user to retrieve.',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'The user data.',
    examples: {
      example1: {
        summary: 'Example for a single user',
        value: {
          id: 1,
          name: 'Alice Smith',
          role: 'manager',
          restaurantId: 3,
          regionId: 5,
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the user to update.',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    examples: {
      example1: {
        summary: 'Update a user example',
        value: {
          id: 1,
          name: 'Updated Name',
          role: 'manager',
          restaurantId: 3,
          regionId: 5,
        },
      },
    },
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the user to delete.',
    example: 1,
  })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
