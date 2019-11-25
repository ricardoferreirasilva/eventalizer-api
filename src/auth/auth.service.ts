import { Injectable } from '@nestjs/common';
import {JwtService  } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService
      ) {}

      async login(user: any) {
        const payload = { username: user.email, _id: user._id, role: user.role};
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
