import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsAlpha,
  IsIn
} from 'class-validator';

export class CreateTodoDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  @IsIn(['pending', 'in-progress', 'done'])
  status: string;
}
