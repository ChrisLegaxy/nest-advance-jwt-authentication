/**
 * @version 1.0.0
 * @license MIT
 * @copyright CPC
 * @author Chris Legaxy | Chris Van
 * @contact chris.legaxy@gmail.com | chrisvan.vshmr@gmail.com
 */

/**
 * * Packages Imports
 */
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * * User Module Imports
 */
import { UserResponseDto } from 'src/modules/user/dto/user.dto';

@Exclude()
export class AuthResponseDto {
  @Expose()
  readonly user: UserResponseDto;

  @Expose()
  readonly accessToken: string;
}

export class RegisterBodyDto {
  @MinLength(4)
  @IsNotEmpty()
  @IsString()
  username: string;

  @MinLength(6)
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginBodyDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
