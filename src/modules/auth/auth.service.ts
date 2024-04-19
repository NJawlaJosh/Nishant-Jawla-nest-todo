import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(RegisterUserDto: RegisterUserDto): Promise<string> {
    const user = await this.userRepository.findOneBy({
      email: RegisterUserDto.email,
    });

    if (user) {
      return RegisterUserDto.email + ' already registered';
    }

    await this.userRepository.save(User.processRequestData(RegisterUserDto));
    return RegisterUserDto.email + ' registered';
  }

  async login(LoginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userRepository.findOneBy({
      email: LoginUserDto.email,
    });

    if (!user) {
      return 'User not found';
    }

    if (!(await user.validatePassword(LoginUserDto.password))) {
      return 'Invalid password';
    }

    return {
      access_token: await this.jwtService.signAsync({
        email: user.email,
        _id: user._id,
      }),
    };
  }
}
