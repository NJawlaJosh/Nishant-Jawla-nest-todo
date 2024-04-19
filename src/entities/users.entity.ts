import { Column, Entity, Unique, OneToMany, BeforeInsert } from 'typeorm';
import { commonEntity } from './common.entity';
import { Todo } from './todo.entity';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email'])
export class User extends commonEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  encryptedPassword: string;

  static processRequestData(requestData: any) {
    const enity = new User();
    enity.firstName = requestData['firstName'];
    enity.lastName = requestData['lastName'];
    enity.email = requestData['email'];
    enity.encryptedPassword = requestData['password'];

    return enity;
  }

  @BeforeInsert()
  async hashPassword() {
    this.encryptedPassword = await bcrypt.hash(this.encryptedPassword, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.encryptedPassword);
  }

}
