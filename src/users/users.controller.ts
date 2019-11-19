import { Controller, Post,Get, Body, UseGuards,Request, Delete  } from '@nestjs/common';
import {RegisterUserDto} from "./dtos/register-user.dto"
import {LoginDto} from "./dtos/login-user.dto"
import {UsersService } from './users.service';
import { User } from './models/user.model';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService){}


  @Post("register")
  async register(@Body() body : RegisterUserDto) {
    return await this.usersService.register(body);
  }

  @UseGuards(AuthGuard('local'))
  @Post("login")
  async login(@Body() body : LoginDto, @Request() req, ) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get("get/all")
  async getAll() {
    const users = await this.usersService.all();
    return users;
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete("delete/all")
  async deleteAll(){
    return await this.usersService.deleteAll();
  }
}
