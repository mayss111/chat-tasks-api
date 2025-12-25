// src/messages/messages.service.ts
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { MessagesRepository } from './message.repository';
import { MessageDocument } from './schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageResponseDto } from './dto/message-reponse.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  async create(data: CreateMessageDto): Promise<MessageResponseDto> {
    const message = await this.messagesRepository.create(data as any);
    return plainToInstance(MessageResponseDto, message.toObject());
  }

  async findAll(): Promise<MessageResponseDto[]> {
    const messages = await this.messagesRepository.findAll();
    return messages.map((m: MessageDocument) =>
      plainToInstance(MessageResponseDto, m.toObject()),
    );
  }

  async findByRoom(roomId: string): Promise<MessageResponseDto[]> {
    const messages = await this.messagesRepository.findByRoom(roomId);
    return messages.map((m: MessageDocument) =>
      plainToInstance(MessageResponseDto, m.toObject()),
    );
  }
}
