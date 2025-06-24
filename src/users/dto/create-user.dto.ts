import {
  IsDateString,
  IsEmail,
  IsInt,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  @Length(3, 30, { message: 'Username must be between 3 and 30 characters' })
  username: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsString()
  @Length(6, 50, { message: 'Password must be between 6 and 50 characters' })
  @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      'Password must contain at least one uppercase letter and one number',
  })
  password: string;

  @IsDateString()
  birth_date: string;

  @IsString()
  city: string;

  @IsString()
  @MaxLength(300, { message: 'Bio cannot be longer than 300 characters' })
  bio?: string;

  @IsInt()
  role_id: number;
}
