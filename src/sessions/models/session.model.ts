import { prop, Ref, Typegoose, arrayProp} from "@typegoose/typegoose";
import { ObjectID } from "mongodb"
import * as bcrypt from "bcrypt"

class TicketReservation {

  @prop({ type: ObjectID, required: true })
  partnerId: ObjectID;

  @prop({ type: Number, required: true, min: 1 })
  tickets: number;

}

export class Session{
  @prop({
    type: Date,
    required: true
  })
  start: Date;

  @prop({
    type: Date,
    required: true
  })
  end: Date;

  @prop({
    type: Number,
    required: true
  })
  maxTickets: number;

  @arrayProp({
    items: TicketReservation,
    required: true
  })
  reservations?: TicketReservation[];

  public get totalReservations() : number {
    let reservations : any[] = this.reservations;
    let count = reservations.reduce((previousValue: number, currentReservation : TicketReservation,)=>{
      return previousValue + currentReservation.tickets;
    }, 0);
    return count;
  }
  
  public get freeTickets() : number {
    return (this.maxTickets - this.totalReservations)
  }

  public canReserve(tickets : number) : number | boolean {
      if(tickets <= this.freeTickets) return true;
      else return this.freeTickets;
  }

}

