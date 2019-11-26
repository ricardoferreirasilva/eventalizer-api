import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypegooseModule } from "nestjs-typegoose";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RegistrationTokensModule } from './registration-tokens/registration-tokens.module';
import { SessionsModule } from './sessions/sessions.module';
import * as Environments from "dotenv";
Environments.config();
@Module({
  imports: [TypegooseModule.forRoot(process.env.db_url,{useUnifiedTopology:true,useNewUrlParser:true,useCreateIndex: true}), UsersModule, AuthModule, RegistrationTokensModule, SessionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
