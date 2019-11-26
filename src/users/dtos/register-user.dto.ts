import { ApiModelProperty} from '@nestjs/swagger';
import {IsString,IsEmail,MinLength} from "class-validator"

export class RegisterUserDto {

    @ApiModelProperty({example: "admin@eventalizer.com"})
    @IsString()
    @IsEmail()
    readonly email: string;

    @ApiModelProperty({example: "Test Instituition"})
    @IsString()
    @MinLength(5)
    readonly name: string;

    @ApiModelProperty({example: "safepassword12345"})
    @IsString()
    @MinLength(5)
    readonly password: string;

    @ApiModelProperty()
    @IsString()
    @MinLength(5)
    readonly registrationToken: string;
  }