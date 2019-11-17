import { Controller, Post,Get, Body, UseGuards  } from '@nestjs/common';
import {RegisterUserDto} from "./dtos/register-user.dto"
import {LoginDto} from "./dtos/login-user.dto"
import {UsersService } from './users.service';
import { User } from './models/user.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Post("register")
  async register(@Body() body : RegisterUserDto): Promise<string> {
    const user = await this.usersService.register(body);
    return "OK";
  }

  @Post("login")
  async login(@Body() body : LoginDto): Promise<string> {
    const user = await this.usersService.login(body);
    return "OK";
  }

  @Get("all")
  async all(): Promise<User[]> {
    const users = await this.usersService.all();
    return users;
  }
}
