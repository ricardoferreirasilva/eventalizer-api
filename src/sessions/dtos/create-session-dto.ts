import { ApiModelProperty} from '@nestjs/swagger';
import {IsString, IsDateString, IsNumber, Min} from "class-validator"

export class CreateSessionDto {

  
    @ApiModelProperty({example: "2020-06-07T18:00:00.000"})
    @IsString()
    @IsDateString()
    readonly start: string;

    
    @ApiModelProperty({example: "2020-06-07T19:00:00.000"})
    @IsString()
    @IsDateString()
    readonly end: string;

    @ApiModelProperty({example: 30})
    @IsNumber()
    @Min(0)
    readonly maxTickets: number;

  }