import { Controller, Get, Delete, Post, Body } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dtos/create-session-dto';
import { DeleteOneSessionDto } from './dtos/delete-one-session.dto';

@ApiUseTags("sessions")
@Controller('sessions')
export class SessionsController {

    constructor(private readonly sessionsService: SessionsService){}

    @ApiBearerAuth()
    @Post("create")
    async create(@Body() createSession: CreateSessionDto) {
        return this.sessionsService.create(createSession);
    }

    @Get("get/all")
    async getAll() {
        return this.sessionsService.getAll();
    }

    
    @Delete("delete/all")
    async deleteAll() {
        return this.sessionsService.deleteAll();
    }

    @Delete("delete/one")
    async deleteOne(@Body() deleteOne: DeleteOneSessionDto) {
        return this.sessionsService.deleteOne(deleteOne);
    }
}
