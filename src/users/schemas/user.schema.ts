// src/users/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
@Prop({ required: true })
username: string;
@Prop({ required: true, unique: true, lowercase: true, trim: true })
email: string;

@Prop({ required: true })
password: string;

@Prop({ default: false })
isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
