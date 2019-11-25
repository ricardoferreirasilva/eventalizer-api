import { ApiModelProperty} from '@nestjs/swagger';
import {IsString,IsDateString,MinLength,IsOptional,IsDefined} from "class-validator"
import {Type} from "class-transformer"

export class CreateRegistrationTokenDto {

    @ApiModelProperty({example: "2017-06-07T14:34:08.700"})
    @IsString()
    @IsDateString()
    readonly expirationDate: string;

    @ApiModelProperty({example: "giveToken123!"})
    @Type(() => String)
    @IsString()
    @IsOptional()
    @MinLength(5)
    readonly identifier: string;

  }