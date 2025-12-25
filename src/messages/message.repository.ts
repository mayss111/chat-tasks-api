import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MongoGenericRepository } from '../common/repositories/mongo-generic.repository';
import { Message, MessageDocument } from './schemas/message.schema';

@Injectable()
export class MessagesRepository extends MongoGenericRepository<MessageDocument> {
  constructor(
    @InjectModel(Message.name) messageModel: Model<MessageDocument>,
  ) {
    super(messageModel);
  }

  async findByRoom(roomId: string): Promise<MessageDocument[]> {
    return this.findAll({ room: new Types.ObjectId(roomId) } as any);
  }
}
