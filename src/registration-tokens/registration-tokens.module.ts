import { Module } from '@nestjs/common';
import { RegistrationTokensController } from './registration-tokens.controller';
import { RegistrationTokensService } from './registration-tokens.service';
import { JwtModule } from '@nestjs/jwt';
import { RegistrationToken } from './models/registrationToken.model';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    TypegooseModule.forFeature([RegistrationToken]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' }
    }),
  ],
  controllers: [RegistrationTokensController],
  providers: [RegistrationTokensService],
  exports: [RegistrationTokensService]
})
export class RegistrationTokensModule {}
