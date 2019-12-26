import * as fs from "fs";
import * as Environments from "dotenv";
Environments.config();
class Configuration {


    public readonly port: number;
    public readonly mongoUri: string;
    public readonly jwtSecret: string;
    public readonly adminSecret: string;


    constructor(){
        this.port = 3000;

        if(process.env.PORT !== undefined){
            try {
                this.port = parseInt(process.env.PORT);
            } catch (error) {
                throw new Error("Could not parse environment -> port.");
            }
        }
        else{
            console.warn("Port is not defined. Defaulting to 3000.")
        }

        if(process.env.MONGODB_URI !== undefined){
            this.mongoUri = process.env.MONGODB_URI;
        }
        else{
            throw new Error("MongoDB uri is not defined.")
        }

        if(process.env.JWT_SECRET !== undefined){
            this.jwtSecret = process.env.JWT_SECRET;
        }
        else{
            throw new Error("Jwt Secret is not defined.")
        }

        if(process.env.ADMIN_SECRET !== undefined){
            this.adminSecret = process.env.ADMIN_SECRET;
        }
        else{
            throw new Error("Admin secret is not defined.")
        }
    }
}

const configuration : Configuration = new Configuration();
export default configuration;
