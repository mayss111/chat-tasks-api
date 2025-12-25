import { Exclude, Expose, Transform } from 'class-transformer';
import { Types } from 'mongoose';

@Exclude()
export class RoomResponseDto {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id: string;

  @Expose()
  name: string;

  @Expose()
   @Transform(({ obj }) =>
    (obj.members || []).map((m: Types.ObjectId | string) =>
      m.toString(),
    ),
  )
  members: string[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
