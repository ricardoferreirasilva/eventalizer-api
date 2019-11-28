import { Controller, Get, Delete, Post, Body, UseGuards, Req, Query } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dtos/create-session-dto';
import { DeleteOneSessionDto } from './dtos/delete-one-session.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/guards/admin.guard';
import { MakeReservationDto } from './dtos/make-reservation-dto';
import { Request } from 'express';
import { GetOneSessionDto } from './dtos/get-one-session.dto';

@ApiUseTags("sessions")
@Controller('sessions')
export class SessionsController {

    constructor(private readonly sessionsService: SessionsService){}


    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Get("get/all")
    async getAll() {
        return this.sessionsService.getAll();
    }

    
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Get("get/totalReservations")
    async getTotalReservations(@Query() getOneSession: GetOneSessionDto) {
        return await this.sessionsService.getTotalReservations(getOneSession);
    }

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @ApiBearerAuth()
    @Post("create")
    async create(@Body() createSession: CreateSessionDto) {
        return this.sessionsService.create(createSession);
    }

    
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Post("reserve")
    async reserve(@Body() reservation : MakeReservationDto, @Req() request: Request) {
        const user : any = request.user;
        return this.sessionsService.reserve(reservation, user.userId)
    }

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @ApiBearerAuth()
    @Delete("delete/all")
    async deleteAll() {
        return this.sessionsService.deleteAll();
    }

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @ApiBearerAuth()
    @Delete("delete/one")
    async deleteOne(@Query() deleteOne: DeleteOneSessionDto) {
        return this.sessionsService.deleteOne(deleteOne);
    }
}
