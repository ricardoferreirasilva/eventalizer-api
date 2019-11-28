import { Controller, Post,Get, Body, UseGuards,Request, Delete, InternalServerErrorException, BadRequestException  } from '@nestjs/common';
import {RegisterUserDto} from "./dtos/register-user.dto"
import {LoginDto} from "./dtos/login-user.dto"
import {UsersService } from './users.service';
import { User } from './models/user.model';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AdminGuard } from '../auth/guards/admin.guard';
import { RegistrationGuard } from '../auth/guards/registration.guard';
import { RegistrationTokensService } from '../registration-tokens/registration-tokens.service';



@ApiUseTags("users")
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly registrationTokenService: RegistrationTokensService,
    private readonly authService: AuthService){}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get("get/all")
  async getAll() {
    const users = await this.usersService.all();
    return users;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get("get/all/admins")
  async getAllAdmins() {
    const users = await this.usersService.allAdmins();
    return users;
  }

  @UseGuards(RegistrationGuard)
  @Post("register")
  async register(@Body() body : RegisterUserDto, @Request() req) {
    await this.usersService.register(body);
    const registrationTokenId = req.registrationToken;
    await this.registrationTokenService.deleteOneById(registrationTokenId);
    return "OK";
  }

  @UseGuards(AuthGuard('local'))
  @Post("login")
  async login(@Body() body : LoginDto, @Request() req, ) {
    return this.authService.login(req.user);
  }
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete("delete/all")
  async deleteAll(){
    return await this.usersService.deleteAll();
  }
}
