import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/Guards/auth.guard';
import { Role } from 'src/user/enum/role.enum';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiBody({
    description: 'Register new user credentials',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'JohnDoe' },
        password: { type: 'string', example: 'SecurePassword_123' },
        role: {
          type: 'string',
          enum: Object.values(Role),
          example: Role.ADMIN,
        },
        restaurantId: { type: 'number', example: 1 },
        regionId: { type: 'number', example: 2 },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - User already exists',
  })
  async register(@Body() data: CreateAuthDto) {
    return this.authService.register(data);
  }

  @Post('/login')
  @ApiBody({
    description: 'Login credentials for user',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'JohnDoe' },
        password: { type: 'string', example: 'SecurePassword_123' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged in, returns a JWT token',
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string', example: 'your.jwt.token.here' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid credentials',
  })
  async login(@Body() data: UpdateAuthDto) {
    return this.authService.login(data);
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved user data',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User data retrieved successfully!',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication failed',
  })
  async meUser(@Req() req: Request) {
    return this.authService.getUserData(req);
  }
}
