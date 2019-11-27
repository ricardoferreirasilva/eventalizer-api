import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Session } from './models/session.model';

@Module({
  imports: [
    TypegooseModule.forFeature([Session]),
  ],
  providers: [SessionsService],
  controllers: [SessionsController]
})
export class SessionsModule {}
