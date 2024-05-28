import { CreateTodoDto } from './create-todo.dto';
import { PickType } from '@nestjs/swagger';

export class UpdateTodoDto extends PickType(CreateTodoDto, [
  'status',
] as const) {}
