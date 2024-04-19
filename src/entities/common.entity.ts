import {
  CreateDateColumn,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class commonEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
