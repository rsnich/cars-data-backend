import { Controller, Get, Param, Post, Put, Delete, Body, NotFoundException, Res, HttpStatus } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarDto } from './dto/car.dto'

@Controller('car')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  /**
   * Create a new car record
   */
  @Post()
  async createCarRecord(@Body() carData: CarDto, @Res() res) {
    await this.carsService.createCarRecord(carData)
      .then(carRecord => res.status(HttpStatus.OK).json(carRecord))
      .catch(err => {
        res.status(HttpStatus.BAD_REQUEST).json("Cannot add a new car record, error [" + err.message + "]");
      });
  }

  /**
   * Get all cars
   */
  @Get()
  async getAll(@Res() res) {
    await this.carsService.getAllCarRecords()
      .then(carRecord => res.status(HttpStatus.OK).json(carRecord))
      .catch(err => {
        res.status(HttpStatus.BAD_REQUEST).json("Cannot get car records, error [" + err.message + "]");
      });
  }

  /**
   * Get a car manufacturer record by the appropriate car ID
   * @param id - ID of the required car
   */
  @Get(':id/manufacturer')
  async getCarManufacturerByID(@Param('id') id : string, @Res() res) {
    await this.carsService.getCarManufacturerRecord(id)
      .then(carRecord => res.status(HttpStatus.OK).json(carRecord))
      .catch(err => {
        res.status(HttpStatus.BAD_REQUEST).json("Cannot get the required manufacturer record, error [" + err.message + "]");
      });

  }

  /**
   * Get a car record by its ID
   * @param id - ID of the required car
   */
  @Get(':id')
  async getByID(@Res() res, @Param('id') id : string) {
    await this.carsService.getOneCarRecord(id)
      .then(carRecord => res.status(HttpStatus.OK).json(carRecord))
      .catch(err => {
        res.status(HttpStatus.BAD_REQUEST).json("Cannot get the required car record, error [" + err.message + "]");
      });
  }

  /**
   * Apply discount of 20% to all cars having first registration date between 12 and 18 months
   */
  @Put('discount')
  async setDiscount(@Res() res) {
    await this.carsService.applyDiscount()
      .then(carRecord => res.status(HttpStatus.OK).json(carRecord))
      .catch(err => {
        res.status(HttpStatus.BAD_REQUEST).json("Cannot appy the discount, error [" + err.message + "]");
      });
  }
  
  /**
   * Get a car record by its ID
   * @param id - ID of the required car
   */
  @Put(':id')
  async updateCarRecord(@Res() res, @Param('id') id : string, @Body() carData) {
    await this.carsService.updateCarRecord(id, carData)
      .then(carRecord => res.status(HttpStatus.OK).json(carRecord))
      .catch(err => {
        res.status(HttpStatus.BAD_REQUEST).json("Cannot update the required car record, error [" + err.message + "]");
      });
  }

  /**
   * Delete car owners who bought their cars before the last 18 months
   */
  @Delete('owners')
  async deleteOwners(@Res() res) {
    return await this.carsService.deleteCarOwners()
    .then(carRecord => res.status(HttpStatus.OK).json(carRecord))
    .catch(err => {
      res.status(HttpStatus.BAD_REQUEST).json("Cannot update owners, error [" + err.message + "]");
    });
  }

  /**
   * Delete a car record by its ID
   * @param id - ID of the required car
   */
  @Delete(':id')
  async deleteByID(@Res() res, @Param('id') id : string) {
    await this.carsService.deleteCarRecord(id)
      .then(result => res.status(HttpStatus.OK).json(result))
      .catch(err => {
        res.status(HttpStatus.BAD_REQUEST).json("Cannot delete the required car record, error [" + err.message + "]");
      });
  }
}
