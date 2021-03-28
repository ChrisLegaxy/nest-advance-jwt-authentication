import { Exclude, Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

@Exclude()
export class UserResponseDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly username: string;

  @Expose()
  readonly updatedAt: Date;

  @Expose()
  readonly createdAt: Date;
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
  @IsUUID()
  id!: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  password!: string;
}
