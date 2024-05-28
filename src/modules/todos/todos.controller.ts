import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Req() request: any) {
    return this.todosService.create(createTodoDto, request.user.email);
  }

  @Get()
  findAll(@Req() request: any) {
    const orderingKey = request.query.orderBy || 'status';
    return this.todosService.findAll(request.user.email, orderingKey);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: any) {
    return this.todosService.findOne(id, request.user.email);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() request: any,
  ) {
    return this.todosService.update(id, updateTodoDto, request.user.email);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: any) {
    return this.todosService.remove(id, request.user.email);
  }
}
