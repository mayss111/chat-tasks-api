// src/rooms/rooms.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RoomsRepository } from './room.repository';
import { RoomDocument } from './schemas/room.schema';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomResponseDto } from './dto/room-reponse.dto';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository) {}

  async create(data: CreateRoomDto): Promise<RoomResponseDto> {
    const room = await this.roomsRepository.create(data as any);
    return plainToInstance(RoomResponseDto, room.toObject());
  }

  async findAll(): Promise<RoomResponseDto[]> {
    const rooms = await this.roomsRepository.findAll();
    return rooms.map((r: RoomDocument) =>
      plainToInstance(RoomResponseDto, r.toObject()),
    );
  }

  async findOne(id: string): Promise<RoomResponseDto> {
    const room = await this.roomsRepository.findById(id);
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return plainToInstance(RoomResponseDto, room.toObject());
  }

  async update(id: string, data: UpdateRoomDto): Promise<RoomResponseDto> {
    const room = await this.roomsRepository.updateById(id, data as any);
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return plainToInstance(RoomResponseDto, room.toObject());
  }

  async remove(id: string): Promise<boolean> {
    return this.roomsRepository.deleteById(id);
  }
}
