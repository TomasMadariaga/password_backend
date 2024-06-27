import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Password } from './password.entity';
import { Repository } from 'typeorm';
import { CreatePasswordDto, UpdatePasswordDto } from './dto/password.dto';

@Injectable()
export class PasswordService {
  constructor(
    @InjectRepository(Password)
    private readonly passwordRespository: Repository<Password>,
  ) {}

  private async getAllPasswords(): Promise<Password[]> {
    const passwords = await this.passwordRespository.find();

    if (!passwords) {
      throw new HttpException('Passwords not found', HttpStatus.NOT_FOUND);
    }

    return passwords;
  }

  private async getOnePassword(id: number): Promise<Password> {
    const passwordFound = await this.passwordRespository.findOne({
      where: { id },
    });

    if (!passwordFound) {
      throw new HttpException('Password not found', HttpStatus.NOT_FOUND);
    }

    return passwordFound;
  }

  public async getPasswordByUserId(id: number): Promise<Password> {
    const passwordFound = await this.passwordRespository.findOne({
      where: { userId: id },
    });

    if (!passwordFound) {
      throw new HttpException('Password not found', HttpStatus.NOT_FOUND);
    }

    return passwordFound;
  }

  public async getPasswordsByUserId(id: number): Promise<Password[]> {
    const passwordsFound = await this.passwordRespository.find({
      where: { userId: id },
    });

    if (!passwordsFound) {
      throw new HttpException('Passwords not found', HttpStatus.NOT_FOUND);
    }

    return passwordsFound;
  }

  public async savePassword(passwordDto: CreatePasswordDto): Promise<Password> {
    const newPassword = this.passwordRespository.create(passwordDto);

    await this.passwordRespository.save(newPassword);

    return newPassword;
  }

  public async modifyPassword(
    id: number,
    passwordDto: UpdatePasswordDto,
  ): Promise<Password> {
    const passwordFound = await this.passwordRespository.findOne({
      where: { id },
    });

    if (!passwordFound) {
      throw new HttpException('Password not found', HttpStatus.NOT_FOUND);
    }

    const updatedPassword = Object.assign(passwordFound, passwordDto);
    return this.passwordRespository.save(updatedPassword);
  }

  public async deletePassword(id: number) {
    const passwordFound = await this.passwordRespository.findOne({
      where: { id },
    });

    if (!passwordFound) {
      throw new HttpException('Password not found', HttpStatus.NOT_FOUND);
    }

    return await this.passwordRespository.delete({ id });
  }
}
