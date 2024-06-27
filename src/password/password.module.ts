import { Module } from '@nestjs/common';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Password } from './password.entity';
import { User } from 'src/users/user.entity';

@Module({
  controllers: [PasswordController],
  providers: [PasswordService],
  imports: [TypeOrmModule.forFeature([Password, User])]
})
export class PasswordModule {}
