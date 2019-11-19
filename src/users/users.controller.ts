import { Controller, Post,Get, Body, UseGuards,Request  } from '@nestjs/common';
import {RegisterUserDto} from "./dtos/register-user.dto"
import {LoginDto} from "./dtos/login-user.dto"
import {UsersService } from './users.service';
import { User } from './models/user.model';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { ApiBearerAuth } from '@nestjs/swagger';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService){}


  @Post("register")
  async register(@Body() body : RegisterUserDto): Promise<string> {
    const user = await this.usersService.register(body);
    return "OK";
  }

  @UseGuards(AuthGuard('local'))
  @Post("login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get("all")
  async all(): Promise<User[]> {
    const users = await this.usersService.all();
    return users;
  }
}
