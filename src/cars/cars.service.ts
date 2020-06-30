import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types} from 'mongoose';
import { CarDto } from './dto/car.dto';
import { Car } from './schemas/car.schema';
import { Manufacturer } from './schemas/manufacturer.schema';


@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private readonly carRecordModel: Model<Car>) {}
  
  /**
   * Add a new car record to the collection 
   * @param carDto contains car data
   */
  async createCarRecord(carDto: CarDto): Promise<Car> {
    // Converts dates to ISODates
    carDto.firstRegistrationDate = new Date(carDto.firstRegistrationDate);
    carDto.owners.forEach(owner => {
      owner.purchaseDate = new Date(owner.purchaseDate);
    });
    // Save the document
    const newCarRecord = new this.carRecordModel(carDto);
    return newCarRecord.save();
  }

  /**
   * Get all car records from the collection
   */
  async getAllCarRecords(): Promise<Car[]> {
    return this.carRecordModel.find().exec();
  }

  /**
   * Get a car record
   * @param id - ID of the car record
   */
  async getOneCarRecord(id: string): Promise<Car> {
    return this.carRecordModel.findById(id).exec();
  }

  /**
   * Get car manufacturer information for the collection
   * @param id - ID of the car record
   */
  async getCarManufacturerRecord(id: string): Promise<Manufacturer> {
    return this.carRecordModel.findById(id).exec()
      .then(carRecord => carRecord.manufacturer);
  }

  /**
   * Update a car doument
   * @param id  - ID of the car record
   * @param carRecord - updated car document
   */
  async updateCarRecord(id: string, carRecord : any): Promise<Car> {
    return this.carRecordModel.findOneAndUpdate({_id: id}, carRecord, {upsert: true, new: true}).exec();
  }
  
  /**
   * Delete a car document
   * @param id - ID of the car record
   */
  async deleteCarRecord(id: string): Promise<Car> {
    return this.carRecordModel.findOneAndDelete({_id: id}).exec();
  }

  /**
   * Delete cars owners who bought their cars before last 18 month
   */
  async deleteCarOwners(): Promise<Car> {
    const numberOfMonths: number  = 18;
    
    const beginDate = new Date();
    beginDate.setMonth(beginDate.getMonth() - numberOfMonths);
    
    return this.carRecordModel.updateMany({}, { 
      $pull: { "owners": { "purchaseDate": { $lt: beginDate } } } 
    } ).exec();
  }

  /**
   * Apply discount to all cars having first registration between 12 and 18 months 
   */
  async applyDiscount() : Promise<Car> {
    const discountPercent: number = 20;
    const monthRangeBegin: number = 18;
    const monthRangeEnd: number = 12;
        
    let factor: number = 0;
    if(discountPercent < 100) {
      factor = (100-discountPercent) / 100;
    }

    const beginDate = new Date();
    beginDate.setMonth(beginDate.getMonth() - monthRangeBegin);
    
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() - monthRangeEnd);
        
    return this.carRecordModel.updateMany({
        firstRegistrationDate: { $gte: beginDate, $lte: endDate }
      }, 
      { 
        $mul: { price: factor }
      } ).exec();
  }

}
