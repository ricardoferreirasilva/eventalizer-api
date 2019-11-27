import { prop, Ref} from "@typegoose/typegoose";
import { ObjectID } from "mongodb"
import * as bcrypt from "bcrypt"
 
class TicketReservation {

    @prop({type: ObjectID, required: true})
    partnerId: ObjectID;

    @prop({type: Number, required: true, min: 1})
    tickets: number;

}

export class Session{
  @prop({
    type: Date,
    required: true})
  start: Date;

  @prop({
    type: Date,
    required: true})
  end: Date;
  
  @prop({
    type: Number,
    required: true})
  maxTickets: number;

  @prop({
    type: Array,
    required: true})
    reservations: TicketReservation[];
}


