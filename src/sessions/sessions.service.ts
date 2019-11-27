import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Session } from './models/session.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateSessionDto } from './dtos/create-session-dto';
import { DeleteOneSessionDto } from './dtos/delete-one-session.dto';
import { ObjectID } from 'bson';

@Injectable()
export class SessionsService {
    constructor(@InjectModel(Session) private readonly SessionModel: ReturnModelType<typeof Session>) {}

    public async getAll(){
        return this.SessionModel.find({});
    }

    public async create(createSession: CreateSessionDto){
        const session = new this.SessionModel({start: createSession.start, end: createSession.end, maxTickets: createSession.maxTickets});
        return await session.save();
    }
    public async deleteAll(){
        return this.SessionModel.deleteMany({});
    }

    public async deleteOld(){
        return this.SessionModel.deleteMany({end: {$lt : Date.now() }});
    }

    public async deleteOne(deleteOne : DeleteOneSessionDto){
        let id : ObjectID = deleteOne.id;
        return this.SessionModel.deleteOne({_id: id});
    }

}
