import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../entities/users.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JWT_ACCESS_SECRET } from '../../utils/env';
import { JwtStrategy } from './auth.strategy';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [
          TypeOrmModule.forFeature([User]),
          JwtModule.register({
            secret: JWT_ACCESS_SECRET,
            signOptions: { expiresIn: '6000s' },
          }),
        ],
        controllers: [AuthController],
        providers: [AuthService, JwtStrategy],
      }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});