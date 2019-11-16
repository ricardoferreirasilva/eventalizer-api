import { Controller, Post, Body } from '@nestjs/common';
import {RegisterUserDto} from "./dtos/register-user.dto"

@Controller('users')
export class UsersController {
    
  @Post("register")
  postRegisterUser(@Body() body : RegisterUserDto): RegisterUserDto {
    
    return body;
  }
}
