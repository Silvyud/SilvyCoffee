import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  registerUser(
    @Body() registerBodyDto: RegisterUserDto
  ){
    return this.authService.registerUser(registerBodyDto)
  }

  @Post()
  loginUser(
    @Body() loginUserDto: LoginUserDto
  ){
    return this.authService.loginUser(loginUserDto)
  }

}
