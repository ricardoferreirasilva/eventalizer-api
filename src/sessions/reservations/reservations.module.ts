import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { Session } from '../models/session.model';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [TypegooseModule.forFeature([Session])],
  controllers: [ReservationsController],
  providers: [ReservationsService]
})
export class ReservationsModule {}
