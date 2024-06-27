import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PasswordService } from './password.service';
import { CreatePasswordDto, UpdatePasswordDto } from './dto/password.dto';

@Controller('password')
export class PasswordController {
  constructor(private passwordService: PasswordService) {}

  @Get('user/:id')
  async findPasswordByUserId(@Param('id', ParseIntPipe) id: number) {
    return await this.passwordService.getPasswordByUserId(id);
  }

  @Get('user/passwords/:id')
  async findPasswordsByUserId(@Param('id', ParseIntPipe) id: number) {
    return await this.passwordService.getPasswordsByUserId(id);
  }

  @Post('/create')
  async createPassword(@Body() passwordDto: CreatePasswordDto) {
    return await this.passwordService.savePassword(passwordDto);
  }

  @Put(':id')
  async modifyPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() passwordDto: UpdatePasswordDto,
  ) {
    return await this.passwordService.modifyPassword(id, passwordDto);
  }

  @Delete(':id')
  async deletePassword(@Param('id', ParseIntPipe) id: number) {
    return await this.passwordService.deletePassword(id);
  }
}
