import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Session } from './models/session.model';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class SessionsService {
    constructor(@InjectModel(Session) private readonly SessionModel: ReturnModelType<typeof Session>) {}

    public async getAll(){
        return this.SessionModel.find({});
    }

    public async deleteAll(){
        return this.SessionModel.deleteMany({});
    }

    public async deleteOld(){
        return this.SessionModel.deleteMany({end: {$lt : Date.now() }});
    }

}
