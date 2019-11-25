import { prop, Typegoose,} from "@typegoose/typegoose";
import * as bcrypt from "bcrypt"
 
export class RegistrationToken{

  @prop({
    type: String,
    required: true})
  hash: String;

  @prop({
    type: Date,
    required: true})
  expirationDate: Date;

}