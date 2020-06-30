import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Owner extends Types.Subdocument {
  @Prop()
  name: string;

  @Prop({type: Date})
  purchaseDate: Date;
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);
