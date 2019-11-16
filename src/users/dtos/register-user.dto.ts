import { ApiModelProperty } from '@nestjs/swagger';
export class RegisterUserDto {
    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly name: number;

    @ApiModelProperty()
    readonly password: string;

    @ApiModelProperty()
    readonly registrationToken: string;
  }