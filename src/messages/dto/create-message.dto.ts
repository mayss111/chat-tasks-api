import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsMongoId()
  sender: string;

  @IsMongoId()
  room: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
