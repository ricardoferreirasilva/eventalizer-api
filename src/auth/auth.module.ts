import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AdminGuard } from './guards/admin.guard';
import { JwtStrategy } from './jwt.strategy';
import {JwtModule} from "@nestjs/jwt"
import * as Environments from "dotenv";
import { RegistrationGuard } from './guards/registration.guard';
import { RegistrationTokensModule } from '../registration-tokens/registration-tokens.module';
Environments.config();
@Module({
  imports: [forwardRef(() => UsersModule), PassportModule, RegistrationTokensModule,
  JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, AdminGuard, RegistrationGuard],
  exports: [AuthService, AdminGuard, RegistrationGuard]
})
export class AuthModule {}
