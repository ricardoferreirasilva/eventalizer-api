import { Controller,Body, Req, Post, UseGuards } from '@nestjs/common';
import { MakeReservationDto } from './dtos/make-reservation-dto';
import { ReservationsService } from './reservations.service';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('reservations')
export class ReservationsController {

    constructor(private readonly reservationsController: ReservationsService){}
    
    
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Post("create")
    async reserve(@Body() reservation : MakeReservationDto, @Req() request: Request) {
        const user : any = request.user;
        return this.reservationsController.reserve(reservation, user.userId)
    }
}
