import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

@Exclude()
export class UserResponseDto {
  /**
   * * id - unique identifier
   */
  @Expose()
  id: string;

  /**
   * * username
   */
  @Expose()
  username: string;
}

export class UserCreateBodyDto {
  @MinLength(4)
  @IsNotEmpty()
  @IsString()
  username: string;

  @MinLength(6)
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UserUpdateBodyDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  password!: string;
}
