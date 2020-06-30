import { Manufacturer } from './manufacturer.schema'
import { Owner } from './owner.schema'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Car extends Document {
  @Prop()
  manufacturer: Manufacturer;

  @Prop()
  price: number;

  @Prop({type: Date})
  firstRegistrationDate: Date;

  @Prop()
  owners: Types.Array<Owner>
}

export const CarSchema = SchemaFactory.createForClass(Car);
