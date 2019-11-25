import { Controller, UseGuards, Get, Post, Body } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AdminGuard } from '../auth/guards/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { CreateRegistrationTokenDto } from './dtos/create-registration-token.dto';
import { RegistrationToken } from './models/registrationToken.model';
import { RegistrationTokensService } from './registration-tokens.service';

@ApiUseTags("registration-tokens")
@UseGuards(AuthGuard('jwt'), AdminGuard)
@Controller('registration-tokens')
export class RegistrationTokensController {

    constructor(private readonly registrationTokenService: RegistrationTokensService){

    }

    @ApiBearerAuth()
    @Get("get/all")
    async getAll() {
        return this.registrationTokenService.getAll();
    }

    @ApiBearerAuth()
    @Post("create")
    async create(@Body() createRegistrationToken: CreateRegistrationTokenDto) {
        let registrationToken: RegistrationToken =  await this.registrationTokenService.create(createRegistrationToken);
        return registrationToken;
    }

}
