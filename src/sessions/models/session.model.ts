import { prop, Ref, Typegoose, arrayProp} from "@typegoose/typegoose";
import { ObjectID, ObjectId } from "mongodb"

class TicketReservation {
  _id?: ObjectID;

  @prop({ type: ObjectID, required: true, index: true})
  partnerId?: ObjectID;

  @prop({ type: Number, required: true, min: 1 })
  tickets?: number;

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
    required: true,
    _id: true
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

  public deleteReservationById(reservationId: ObjectID, partnerId: ObjectID){
      let deletedReservation = undefined;
      reservationId = new ObjectID(reservationId);
      partnerId = new ObjectId(partnerId);
      this.reservations = this.reservations.filter((reservation,index,array)=>{
       if(reservationId.equals(reservation._id) && partnerId.equals(reservation.partnerId)){
          deletedReservation = reservation;
          return false;
        }
        else return true;
      });
      return deletedReservation;
    }
}

