import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Like, Repository } from 'typeorm';
import { User } from '../entities/user.enity';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAllByGroup(group: string): Promise<User[]> {
    const options: FindOneOptions<User> = {
      where: {
        groupName: Like(`%${group}%`),
      },
    };
    return await this.userRepository.find(options);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    const options: FindOneOptions<User> = {
      where: {
        id: id,
      },
    };
    return this.userRepository.findOne(options);
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async update(id: number, updateUser: Partial<User>): Promise<User> {
    await this.findById(id); // Check if user exists
    const options: FindOneOptions<User> = {
      where: {
        id: id,
      },
    };
    await this.userRepository.update(id, updateUser);
    return await this.userRepository.findOne(options);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id); // Check if user exists

    await this.userRepository.delete(id);
  }
}
