import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Manufacturer extends Types.Subdocument {
  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  siret: number;
}

export const ManufacturerSchema = SchemaFactory.createForClass(Manufacturer);
