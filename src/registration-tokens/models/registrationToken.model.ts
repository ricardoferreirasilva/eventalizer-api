import { prop, Typegoose,} from "@typegoose/typegoose";
import * as bcrypt from "bcrypt"
 
export class RegistrationToken{

  @prop({
    type: String,
    required: true})
  hash: string;

  @prop({
    type: Date,
    required: true})
  expirationDate: Date;

    public async authenticateIdentifier(identifier : String) : Promise<boolean> {
        const now = Date.now();
        const passwordsMatch : boolean = await bcrypt.compare(identifier, this.hash);
        if(passwordsMatch && now < this.expirationDate.getTime()){
            return true;
        }
        else{
           return false;
        }
    }

}