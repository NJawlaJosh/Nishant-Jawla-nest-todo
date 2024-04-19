import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Todo } from 'src/entities/todo.entity';

@Module({
  controllers: [TodosController],
  imports: [TypeOrmModule.forFeature([User, Todo])],
  providers: [TodosService],
})
export class TodosModule {}
