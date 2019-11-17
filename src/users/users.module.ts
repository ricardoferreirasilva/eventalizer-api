import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypegooseModule } from "nestjs-typegoose";
import { UsersService } from './users.service';
import { User } from './models/user.model';
@Module({
  imports: [TypegooseModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
