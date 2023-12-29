import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
  username: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  email: string;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'john_doe_updated', description: 'The updated username of the user' })
  username: string;

  @ApiProperty({ example: 'john.doe.updated@example.com', description: 'The updated email of the user' })
  email: string;
}
