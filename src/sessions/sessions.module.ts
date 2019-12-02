import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Session } from './models/session.model';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [
    TypegooseModule.forFeature([Session]),
    ReservationsModule,
  ],
  providers: [SessionsService],
  controllers: [SessionsController]
})
export class SessionsModule {}
