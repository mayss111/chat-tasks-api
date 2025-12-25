import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from '../messages/messages.service';
import { RoomsService } from '../rooms/rooms.service';
import { LogsService } from '../logs/logs.service';
import { CreateMessageDto } from '../messages/dto/create-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly messagesService: MessagesService,
    private readonly roomsService: RoomsService,
    private readonly logsService: LogsService,
  ) {}

  async handleConnection(client: Socket) {
    await this.logsService.create({
      type: 'socket',
      message: 'client_connected',
      meta: { clientId: client.id },
    });
  }

  async handleDisconnect(client: Socket) {
    await this.logsService.create({
      type: 'socket',
      message: 'client_disconnected',
      meta: { clientId: client.id },
    });
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { roomId } = data;
    await client.join(roomId);

    await this.logsService.create({
      type: 'socket',
      message: 'join_room',
      meta: { clientId: client.id, roomId },
    });

    this.server.to(roomId).emit('system', {
      message: `A user joined room ${roomId}`,
    });
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { roomId } = data;
    await client.leave(roomId);

    await this.logsService.create({
      type: 'socket',
      message: 'leave_room',
      meta: { clientId: client.id, roomId },
    });

    this.server.to(roomId).emit('system', {
      message: `A user left room ${roomId}`,
    });
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: { sender: string; room: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    const dto: CreateMessageDto = {
      sender: data.sender,
      room: data.room,
      content: data.content,
    };

    const saved = await this.messagesService.create(dto);

    await this.logsService.create({
      type: 'chat',
      message: 'message_sent',
      meta: { clientId: client.id, roomId: data.room, sender: data.sender },
    });

    this.server.to(data.room).emit('message', saved);
  }
}
