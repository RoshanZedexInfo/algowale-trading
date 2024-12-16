import { Transform } from 'class-transformer';
import { IsNotEmpty, Validate } from 'class-validator';
import { EMAILNOTFOUND } from 'src/constants/auth.constant';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';
import { IsExist } from 'src/utils/validators/is-exits.validator';

export class EmailLoginDto {
  @IsNotEmpty()
  @Transform(lowerCaseTransformer)
  @Validate(IsExist, ['User'], {
    message: EMAILNOTFOUND,
  })
  email: string;

  @IsNotEmpty()
  password: string;
}
