
import * as bcrypt from "bcrypt";
import { Injectable,UnauthorizedException} from '@nestjs/common';
import { InjectModel } from "nestjs-typegoose";
import {RegisterUserDto} from "./dtos/register-user.dto"
import {ReturnModelType } from "@typegoose/typegoose";
import {User} from "./models/user.model"
import {LoginDto} from "./dtos/login-user.dto"

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private readonly UserModel: ReturnModelType<typeof User>) {}
    public async all(): Promise<User[]>
    {
        const users = await this.UserModel.find();
        return users;
    }
    public async register(registerUserDto: RegisterUserDto): Promise<User> {
        try {
            const salt : string = await bcrypt.genSalt(10);
            const hash : string = await bcrypt.hash(registerUserDto.password,salt);
            const newUser = new this.UserModel({name: registerUserDto.name, email: registerUserDto.email});
            return await newUser.save();
        } 
        catch (error) {
            return error;
        }
      }


      public async login(loginDto: LoginDto): Promise<boolean> {
        try {
          const user = await this.UserModel.findOne({email: loginDto.email});
          if(user){
              const match : boolean = await user.authenticatePassword(loginDto.password);
              if(!match) throw new UnauthorizedException("Password or email is not correct.");
              else{

              }

          }
        } 
        catch (error) {
            return error;
        }
      }

      
}
