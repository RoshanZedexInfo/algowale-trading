import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
  Validate
} from 'class-validator';
import { Role, ROLES } from 'src/utils/enums/roles.enum';
import { IsNotExist } from 'src/utils/validators/is-not-exits.validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Validate(IsNotExist, ['User'], {
    message: 'Email $value already exists',
  })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsOptional()
  role: Role = ROLES.USER;
}
