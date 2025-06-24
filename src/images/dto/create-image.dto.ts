import {
  IsDateString,
  IsInt,
  IsNumber,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(6, 80, { message: 'The title must be between 6 and 80 characters' })
  title?: string;

  @IsString()
  @MaxLength(300, {
    message: 'The description cannot be longer than 300 characters',
  })
  description?: string;

  @IsString()
  image_url: string;

  @IsDateString()
  capture_time: string;

  @IsNumber()
  x_coordinate: number;

  @IsNumber()
  y_coordinate: number;

  @IsInt()
  user_id: number;

  @IsInt()
  collection_id?: number;
}
