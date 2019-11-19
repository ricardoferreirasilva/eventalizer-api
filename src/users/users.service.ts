
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
    
    public async deleteAll(){
        return await this.UserModel.deleteMany({});
    }
    
    public findByEmail(email: string){
        return this.UserModel.findOne({email:email});
    }
    public async register(registerUserDto: RegisterUserDto): Promise<User> {
        try {
            const salt : string = await bcrypt.genSalt(10);
            const hash : string = await bcrypt.hash(registerUserDto.password,salt);
            const newUser = new this.UserModel({name: registerUserDto.name, email: registerUserDto.email, hash:hash , role: "partner"});
            return await newUser.save();
        } 
        catch (error) {
            return error;
        }
      }      
}
