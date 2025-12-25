import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class MessageResponseDto {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id: string;

  @Expose()
  sender: string;

  @Expose()
  room: string;

  @Expose()
  content: string;

  @Expose()
  createdAt: Date;
}
