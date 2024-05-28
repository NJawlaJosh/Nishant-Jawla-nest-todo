import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from '../../entities/todo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/users.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createTodoDto: CreateTodoDto, user_email: string) {
    const user = await this.userRepository.findOneBy({ email: user_email });
    if (!user) {
      return 'User not found';
    }
    const todo = Todo.processRequestData(createTodoDto, user);
    await this.todoRepository.save(todo);

    return 'Todo created successfully';
  }

  async findAll(user_email: string, orderingKey: keyof Todo) {
    const user = await this.userRepository.findOneBy({ email: user_email });
    if (!user) {
      return 'User not found';
    }

    const todos = await this.todoRepository.find({
      where: {
        user: user,
      },
      order: {
        [orderingKey]: 'DESC',
      },
    });

    return {
      data: todos,
    };
  }

  async findOne(id: string, user_email: string) {
    const user = await this.userRepository.findOneBy({ email: user_email });
    if (!user) {
      return 'User not found';
    }

    const todo = await this.todoRepository.findOneBy({
      user: user,
      _id: new ObjectId(id),
    });

    return {
      data: todo,
    };
  }

  async update(id: string, updateTodoDto: UpdateTodoDto, user_email: string) {
    const user = await this.userRepository.findOneBy({ email: user_email });
    if (!user) {
      return 'User not found';
    }

    const todo = await this.todoRepository.findOneBy({
      user: user,
      _id: new ObjectId(id),
    });

    if (!todo) {
      return 'Todo not found';
    }

    todo.status = updateTodoDto.status;

    await this.todoRepository.update(todo._id, todo);

    return 'Todo updated successfully';
  }

  async remove(id: string, user_email: string) {
    const user = await this.userRepository.findOneBy({ email: user_email });
    if (!user) {
      return 'User not found';
    }

    const todo = await this.todoRepository.findOneBy({
      user: user,
      _id: new ObjectId(id),
    });

    if (!todo) {
      return 'Todo not found';
    }

    await this.todoRepository.delete(todo._id);

    return 'Todo deleted successfully';
  }
}
