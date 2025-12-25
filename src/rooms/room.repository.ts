import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MongoGenericRepository } from '../common/repositories/mongo-generic.repository';
import { Room, RoomDocument } from './schemas/room.schema';

@Injectable()
export class RoomsRepository extends MongoGenericRepository<RoomDocument> {
  constructor(
    @InjectModel(Room.name) roomModel: Model<RoomDocument>,
  ) {
    super(roomModel);
  }

  async findByMember(userId: string): Promise<RoomDocument[]> {
    return this.findAll({ members: new Types.ObjectId(userId) } as any);
  }
}
