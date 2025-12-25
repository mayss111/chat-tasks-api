// src/common/repositories/mongo-generic.repository.ts
import { Logger } from '@nestjs/common';
import {
  Document,
  Model,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

export class MongoGenericRepository<T extends Document> {
  protected readonly logger: Logger;

  constructor(protected readonly model: Model<T>) {
    this.logger = new Logger(MongoGenericRepository.name);
  }

  async create(data: Partial<T>): Promise<T> {
    const created = new this.model(data);
    return created.save();
  }

  async findAll(
    filter: Partial<Record<keyof T, any>> = {},
    options: QueryOptions = {},
  ): Promise<T[]> {
    return this.model.find(filter as any, null, options).exec();
  }

  async findOne(
    filter: Partial<Record<keyof T, any>>,
    options: QueryOptions = {},
  ): Promise<T | null> {
    return this.model.findOne(filter as any, null, options).exec();
  }

  async findById(
    id: string,
    options: QueryOptions = {},
  ): Promise<T | null> {
    return this.model.findById(id, null, options).exec();
  }

  async updateById(
    id: string,
    update: UpdateQuery<T>,
    options: QueryOptions = {},
  ): Promise<T | null> {
    return this.model
      .findByIdAndUpdate(id, update, { new: true, ...options })
      .exec();
  }

  async deleteById(id: string): Promise<boolean> {
    const res = await this.model.findByIdAndDelete(id).exec();
    return !!res;
  }
}
