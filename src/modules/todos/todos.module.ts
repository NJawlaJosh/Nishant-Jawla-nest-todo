import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/users.entity';
import { Todo } from '../../entities/todo.entity';

@Module({
  controllers: [TodosController],
  imports: [TypeOrmModule.forFeature([User, Todo])],
  providers: [TodosService],
})
export class TodosModule {}
