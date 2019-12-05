import { Controller,Body, Req, Post, UseGuards, Delete, Query } from '@nestjs/common';
import { MakeReservationDto } from './dtos/make-reservation-dto';
import { ReservationsService } from './reservations.service';
import { Request } from 'express';
import { ObjectID } from 'mongodb';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { DeleteReservationDto } from './dtos/delete-reservation.dto';

@ApiUseTags("reservations")
@Controller('reservations')
export class ReservationsController {

    constructor(private readonly reservationsService: ReservationsService){}
    
    
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Post("create")
    async reserve(@Body() reservation : MakeReservationDto, @Req() request: Request) {
        const user : any = request.user;
        return this.reservationsService.reserve(reservation, user.userId)
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Delete("delete")
    async delete(@Query() deleteReservation : DeleteReservationDto, @Req() request: Request) {
        const user : any = request.user;
        return this.reservationsService.delete(deleteReservation, user.userId)
    }

    


}
