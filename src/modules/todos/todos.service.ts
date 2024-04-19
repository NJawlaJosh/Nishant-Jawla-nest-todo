import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from 'src/entities/todo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Types } from 'mongoose';

@Injectable()
export class TodosService {

  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createTodoDto: CreateTodoDto, user_email: string) {
    const user =  await this.userRepository.findOneBy({email: user_email})
    if (!user) {
      return "User not found"
    }
    const todo = Todo.processRequestData(createTodoDto, user);
    await this.todoRepository.save(todo);

    return "Todo created successfully"
  }

  async findAll(user_email: string) {

    const todos = await this.todoRepository.find({
      where: {
          user : {  email : user_email  }
      },
  })

  console.log("Todos are : ", todos, " are of type ", typeof(todos));

    return `This action returns all todos of user ${user_email} as ${todos}`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
