import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from '../users/dtos/login-user.dto';
import * as Environments from "dotenv";
Environments.config();

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
    constructor(
        private readonly userService: UsersService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(username);
        if (!user) throw new UnauthorizedException();
        else {
            const passwordMatch = await user.authenticatePassword(password);
            if (!passwordMatch) throw new UnauthorizedException();
            console.log(user)
            return user;
        }
    }
}