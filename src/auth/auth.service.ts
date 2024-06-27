import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneByEmail(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register({ username, email, password }: RegisterDto) {
    try {
      const user = await this.userService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    await this.userService.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });

    return {
      username,
      email,
    };
    } catch (error) {
      throw new BadRequestException(error)
    }
    
  }

  async login({ email, password }: LoginDto) {
    try {
      const user = await this.userService.findOneByEmailWithPassword(email);

      if (!user) {
        throw new UnauthorizedException('Email is wrong');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Password is wrong');
      }

      return {
        id: user.id,
        username: user.username,
        email,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async logout(response: Response) {
    response.cookie('token', '', {
      expires: new Date(0),
    });
  }
}
