import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { userInfo } from 'os';
import { RegistrationTokensService } from '../../registration-tokens/registration-tokens.service';

@Injectable()
export class RegistrationGuard implements CanActivate {
  constructor(private readonly registrationTokenService: RegistrationTokensService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const registrationToken : string = request.body.registrationToken;
    const foundToken = await this.registrationTokenService.findRegistrationToken(registrationToken);
    if(foundToken){
        request.registrationToken = foundToken;
        return true;
    }
    else return false;
  }
}