import { ApiModelProperty} from '@nestjs/swagger';
import {IsString, IsDateString, IsNumber, Min, IsDefined} from "class-validator"
import {Type} from "class-transformer"
import {ObjectID} from "mongodb"

export class DeleteOneSessionDto {

  
    @ApiModelProperty({example: "asdasdsadsadasdads"})
    @IsDefined()
    @Type(() => ObjectID)
    readonly id: ObjectID;

  }