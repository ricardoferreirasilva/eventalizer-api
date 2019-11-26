import { ApiModelProperty} from '@nestjs/swagger';
import {IsString,IsEmail,MinLength} from "class-validator"

export class LoginDto {

    @ApiModelProperty({example: "admin@eventalizer.com"})
    @IsString()
    @IsEmail()
    readonly username: string;

    @ApiModelProperty({example: "safepassword12345"})
    @IsString()
    @MinLength(5)
    readonly password: string;

  }