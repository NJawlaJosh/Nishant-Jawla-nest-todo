import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmMongoDataSource } from './utils/datasource';
import { TodosModule } from './modules/todos/todos.module';

@Module({
  imports: [
    TypeOrmMongoDataSource,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TodosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
