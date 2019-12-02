import { Injectable, NotAcceptableException} from '@nestjs/common';
import { MakeReservationDto } from './dtos/make-reservation-dto';
import { ObjectID } from 'bson';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Session } from '../models/session.model';
@Injectable()
export class ReservationsService {
    constructor(@InjectModel(Session) private readonly SessionModel: ReturnModelType<typeof Session>) {}

    
    public async reserve(reservation: MakeReservationDto, userId : ObjectID){
        const session = await this.SessionModel.findById(reservation.sessionId);
        const canReserve : number | boolean = session.canReserve(reservation.tickets);

        // Enough free tickets.
        if(canReserve === true){
            session.reservations.push({partnerId:userId,tickets:reservation.tickets})
            return await session.save();
        }
        else{
            const message = `There are only ${session.freeTickets} tickets left.`
            throw new NotAcceptableException(message)
        }
    }
}
