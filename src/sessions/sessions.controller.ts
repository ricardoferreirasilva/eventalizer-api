import { Controller, Get, Delete } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { SessionsService } from './sessions.service';

@ApiUseTags("sessions")
@Controller('sessions')
export class SessionsController {

    constructor(private readonly sessionsService: SessionsService){}

    @Get("get/all")
    async getAll() {
        return this.sessionsService.getAll();
    }

    
    @Delete("delete/all")
    async deleteAll() {
        return this.sessionsService.deleteAll();
    }
}
