import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { Owner, OwnerSchema } from './schemas/owner.schema';
import { Manufacturer, ManufacturerSchema } from './schemas/manufacturer.schema';
import { Car, CarSchema } from './schemas/car.schema';


@Module({
  imports: [MongooseModule.forFeature([
    { name: Owner.name, schema: OwnerSchema },
    { name: Manufacturer.name, schema: ManufacturerSchema },
    { name: Car.name, schema: CarSchema } ]),
  ],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}