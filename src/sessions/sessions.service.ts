import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Session } from './models/session.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateSessionDto } from './dtos/create-session-dto';
import { DeleteOneSessionDto } from './dtos/delete-one-session.dto';
import { ObjectID } from 'mongodb';
import { MakeReservationDto } from './dtos/make-reservation-dto';
import { GetOneSessionDto } from './dtos/get-one-session.dto';

@Injectable()
export class SessionsService {
    constructor(@InjectModel(Session) private readonly SessionModel: ReturnModelType<typeof Session>) {}

    public async getAll(){
        return this.SessionModel.find({});
    }
    public async getTotalReservations(getSession: GetOneSessionDto){
        const session = await this.SessionModel.findById(getSession.id);
        const totalReservations = session.totalReservations;
        return totalReservations;
    }
    public async create(createSession: CreateSessionDto){
        const session = new this.SessionModel({start: createSession.start, end: createSession.end, maxTickets: createSession.maxTickets});
        return await session.save();
    }

    public async reserve(reservation: MakeReservationDto, userId : ObjectID){
        const session = await this.SessionModel.findById(reservation.sessionId);
        const canReserve : number | boolean = session.canReserve(reservation.tickets);

        // Enough free tickets.
        if(canReserve == true){
            session.reservations.push({partnerId:userId,tickets:reservation.tickets})
            return await session.save();
        }
        else{
            const message = `There are only ${this.SessionModel.freeTickets} tickets left.`
            throw new NotAcceptableException(message)
        }
    }

    public async deleteAll(){
        return this.SessionModel.deleteMany({});
    }

    public async deleteOld(){
        return this.SessionModel.deleteMany({end: {$lt : Date.now() }});
    }

    public async deleteOne(deleteOne : DeleteOneSessionDto){
        return this.SessionModel.findByIdAndDelete(deleteOne.id);
    }

}
