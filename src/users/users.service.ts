import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UsersRepository } from './user.repository';
import { UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-reponse.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(data: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersRepository.create(data as any);
    return plainToInstance(UserResponseDto, user.toObject());
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.findAll();
    return users.map((u) =>
      plainToInstance(UserResponseDto, u.toObject()),
    );
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return plainToInstance(UserResponseDto, user.toObject());
  }

  async update(id: string, data: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.usersRepository.updateById(id, data as any);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return plainToInstance(UserResponseDto, user.toObject());
  }

  async remove(id: string): Promise<boolean> {
    return this.usersRepository.deleteById(id);
  }
}
