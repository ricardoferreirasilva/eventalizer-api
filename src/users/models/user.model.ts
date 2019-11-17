import { prop, Typegoose,} from "@typegoose/typegoose";
import * as bcrypt from "bcrypt"
 
export class User{

  @prop({
    type: String,
    required: true})
  name: String;

  @prop({
    type: String,
    index:true,
    required: true, 
    unique: true,
  })
  email: String;

  @prop({
    type: String,
    required: true})
  hash: string
  
  public async authenticatePassword(password : String) : Promise<boolean> {
      const passwordsMatch : boolean = await bcrypt.compare(password,this.hash);
      if(passwordsMatch){
          return ( passwordsMatch)
      }
  }

   
  public async setPassword(password : String) {
    const salt : string = await bcrypt.genSalt(10);
    const hash : string = await bcrypt.hash(password,salt);
    this.hash = hash;
  }

}