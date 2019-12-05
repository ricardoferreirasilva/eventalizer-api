import { Injectable, NotAcceptableException, NotFoundException} from '@nestjs/common';
import { MakeReservationDto } from './dtos/make-reservation-dto';
import { ObjectID } from 'mongodb';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Session } from '../models/session.model';
import { DeleteReservationDto } from './dtos/delete-reservation.dto';
@Injectable()
export class ReservationsService {
    constructor(@InjectModel(Session) private readonly SessionModel: ReturnModelType<typeof Session>) {}

    
    public async reserve(reservation: MakeReservationDto, userId : ObjectID){
        const session = await this.SessionModel.findById(reservation.sessionId);
        if(session){
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
        else{
            throw new NotFoundException("Session with _id: " + reservation.sessionId + " does not exist.");
        }
    }
    public async delete(deleteReservation : DeleteReservationDto, userId: ObjectID){
        const session = await this.SessionModel.findById(deleteReservation.sessionId);
        if(session){
            const deletedReservation = session.deleteReservationById(deleteReservation.reservationId, userId);
            if(deletedReservation) return await session.save();
            else throw new NotFoundException("Reservation with _id: " + deleteReservation.reservationId + " does not exist.");
        }
        else{
            throw new NotFoundException("Session with _id: " + deleteReservation.sessionId + " does not exist.");
        }
        
    }
   
}
