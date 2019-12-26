import { Module } from '@nestjs/common';
import { RegistrationTokensController } from './registration-tokens.controller';
import { RegistrationTokensService } from './registration-tokens.service';
import { JwtModule } from '@nestjs/jwt';
import { RegistrationToken } from './models/registrationToken.model';
import { TypegooseModule } from 'nestjs-typegoose';
import environment from "../configs/configuration"

@Module({
  imports: [
    TypegooseModule.forFeature([RegistrationToken]),
    JwtModule.register({
      secret: environment.jwtSecret,
      signOptions: { expiresIn: '30d' }
    }),
  ],
  controllers: [RegistrationTokensController],
  providers: [RegistrationTokensService],
  exports: [RegistrationTokensService]
})
export class RegistrationTokensModule {}
