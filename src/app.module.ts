import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { MessagesModule } from './messages/messages.module';
import { LogsModule } from './logs/logs.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
     MongooseModule.forRoot('mongodb://localhost:27017/chat-tasks'),
     UsersModule,
     RoomsModule,
     MessagesModule,
     LogsModule,
     ChatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
