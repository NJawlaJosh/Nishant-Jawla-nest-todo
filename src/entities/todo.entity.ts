import { Column, Entity, ManyToOne, AfterInsert, AfterRemove } from 'typeorm';
import { commonEntity } from './common.entity';
import { User } from './users.entity';
import { CreateTodoDto } from 'src/modules/todos/dto/create-todo.dto';

@Entity()
export class Todo extends commonEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user)
  user: User;

  static processRequestData(data: CreateTodoDto, user: User): Todo {
    const todo = new Todo();

    todo.title = data.title;
    todo.description = data.description;
    todo.status = data.status;
    todo.user = user;

    return todo;
  }
  
}
