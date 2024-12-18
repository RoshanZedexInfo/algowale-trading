import { applyDecorators, UseGuards } from '@nestjs/common';
import { ROLES } from 'src/utils/enums/roles.enum';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from './roles.decorator';

export function IsAdmin() {
  return applyDecorators(Roles(ROLES.ADMIN), UseGuards(RolesGuard));
}
