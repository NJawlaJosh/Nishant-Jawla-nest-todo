import { IsNotEmpty, IsString, MinLength, IsIn } from 'class-validator';

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
  @IsIn(['pending', 'in-progress', 'done'])
  status: string;
}
