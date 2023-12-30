import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, Query } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/entities/user.enity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Get()
  @ApiResponse({ status: 200, description: 'List of users', type: User, isArray: true })
  async findAll(@Query('group') group: string): Promise<User[]> {
    if(group && group.length !== 0) {
      return this.userService.findAllByGroup(group);
    }
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'User details', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findById(@Param('id') id: number): Promise<User> {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  @Post()
  @ApiResponse({ status: 201, description: 'User created successfully', type: User })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.create(createUserDto);
    return user;
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'User updated successfully', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userService.update(id, updateUserDto);

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updatedUser;
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async delete(@Param('id') id: number): Promise<void> {
    await this.userService.delete(id);
  }
}
