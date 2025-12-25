import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MessagesModule } from '../messages/messages.module';
import { RoomsModule } from '../rooms/rooms.module';
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [MessagesModule, RoomsModule, LogsModule],
  providers: [ChatGateway],
})
export class ChatModule {}
