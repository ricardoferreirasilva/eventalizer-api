import { ApiModelProperty} from '@nestjs/swagger';
import {IsString, IsDateString, IsNumber, Min, IsDefined} from "class-validator"
import { Type } from 'class-transformer';
import { ObjectID } from 'mongodb';

export class DeleteReservationDto {

  
    @ApiModelProperty({example: "5dde929e43f55d01006a7c67"})
    @IsDefined()
    @Type(() => ObjectID)
    readonly sessionId: ObjectID;

    
    @ApiModelProperty({example: "5dde929e43f55d01006a7c67"})
    @IsDefined()
    @Type(() => ObjectID)
    readonly reservationId: ObjectID;

  }