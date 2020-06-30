import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [
    
    MongooseModule.forRoot('mongodb://mongo:27017/cars-db', {useFindAndModify: false}),
    CarsModule,
  ],
})
export class AppModule {}
