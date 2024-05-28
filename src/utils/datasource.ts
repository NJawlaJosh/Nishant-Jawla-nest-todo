import { TypeOrmModule } from '@nestjs/typeorm';
import { MONGO_DATABASE_URL } from './env';
// import 'reflect-metadata';

export const TypeOrmMongoDataSource = TypeOrmModule.forRoot({
  type: 'mongodb',
  url: MONGO_DATABASE_URL,
  useNewUrlParser: true,
  logging: ['query', 'error'],
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [],
  subscribers: [],
});
