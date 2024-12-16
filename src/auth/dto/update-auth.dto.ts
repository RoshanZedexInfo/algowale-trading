import { PartialType } from '@nestjs/mapped-types';
import { AuthRegisterLogin } from './auth-register-login.dto';

export class UpdateAuthDto extends PartialType(AuthRegisterLogin) {}
