import * as fs from "fs";
class Configuration {


    public readonly port: number;
    public readonly mongoUri: string;
    public readonly jwtSecret: string;
    public readonly adminSecret: string;


    constructor(configurationPath: fs.PathLike){
        this.port = 3000;
        
        if(!fs.existsSync(configurationPath)){
            console.error("Missing configuration file at: " + configurationPath);
        }
        else{
            const configurationFile = fs.readFileSync(configurationPath,{encoding:"UTF-8"});
            try {
                // Parsing the configuration file.
                const configurationObject = JSON.parse(configurationFile);

                // Attributing variables.
                this.port = configurationObject.port;
                this.mongoUri = configurationObject.mongoUri;
                this.jwtSecret = configurationObject.jwtSecret;
                this.adminSecret = configurationObject.adminSecret;

            } catch (error) {
                console.error(error);
            }
        }
    }
}

const configuration : Configuration = new Configuration(process.cwd() + "\\environment.json");
export default configuration;
