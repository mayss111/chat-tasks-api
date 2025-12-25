// src/users/users.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoGenericRepository } from '../common/repositories/mongo-generic.repository';
import { User, UserDocument } from '../users/schemas/user.schema';
@Injectable()
export class UsersRepository extends MongoGenericRepository<UserDocument> {
constructor(
    @InjectModel(User.name) userModel: Model<UserDocument>,
) {
    super(userModel);
}

  // Exemple de méthode spécifique User
async findByEmail(email: string): Promise<UserDocument | null> {
    return this.findOne({ email } as any);
}
}
