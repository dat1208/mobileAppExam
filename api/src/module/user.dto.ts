import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
  name: string;

  @ApiProperty({ example: 'http://example.com/image.png', description: 'The username of the user' })
  url: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  groupName: string;
}

export class UpdateUserDto extends CreateUserDto { }
 