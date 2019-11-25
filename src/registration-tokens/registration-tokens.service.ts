import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { RegistrationToken } from './models/registrationToken.model';
import { ReturnModelType } from '@typegoose/typegoose';
import * as bcrypt from "bcrypt";
import { CreateRegistrationTokenDto } from './dtos/create-registration-token.dto';
import {v1} from "uuid"
@Injectable()
export class RegistrationTokensService {
    constructor(@InjectModel(RegistrationToken) private readonly RegistrationTokenModel: ReturnModelType<typeof RegistrationToken>) {}

    public async create(createRegistrationToken: CreateRegistrationTokenDto){
        
        let identifier = v1();
        if(createRegistrationToken.identifier){
            identifier = createRegistrationToken.identifier;
        }

        const expirationDate = new Date(createRegistrationToken.expirationDate);
        const salt : string = await bcrypt.genSalt(10);
        const hash : string = await bcrypt.hash(identifier,salt);

        const newRegistrationToken = new this.RegistrationTokenModel({expirationDate: expirationDate, hash: hash});
        return await newRegistrationToken.save();
        
    }

    public getAll(){
        return this.RegistrationTokenModel.find({});
    }

    public async findRegistrationToken(identifier: string){
        const registrationTokens = await this.RegistrationTokenModel.find({});
        for(let registrationToken of registrationTokens){
           const foundToken = await registrationToken.authenticateIdentifier(identifier);
           if(foundToken) return registrationToken._id;
        }
        return false;
    }

    public async deleteOneById(id: any){
        await this.RegistrationTokenModel.deleteOne({_id : id});
    }

    public async deleteAll(){
        await this.RegistrationTokenModel.deleteMany({});
    }
}
