import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypegooseModule } from "nestjs-typegoose";
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { AuthModule } from '../auth/auth.module';
import { RegistrationTokensModule } from '../registration-tokens/registration-tokens.module';
@Module({
  imports: [
    RegistrationTokensModule,
    forwardRef(() => AuthModule),
    TypegooseModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
