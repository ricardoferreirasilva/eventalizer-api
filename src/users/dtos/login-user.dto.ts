import { ApiModelProperty} from '@nestjs/swagger';
import {IsString,IsEmail,MinLength} from "class-validator"

export class LoginDto {

    @ApiModelProperty({example: "user@user.gmail.com"})
    @IsString()
    @IsEmail()
    readonly email: string;

    @ApiModelProperty({example: "safepassword12345"})
    @IsString()
    @MinLength(5)
    readonly password: string;

  }