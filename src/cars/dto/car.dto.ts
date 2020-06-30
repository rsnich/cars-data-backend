import { ManufacturerDto } from './manufacturer.dto'
import { OwnerDto } from './owner.dtol'
import { IsNumber, IsDate } from "class-validator";

export class CarDto {
    readonly manufacturer: ManufacturerDto;
    
    @IsNumber()
    readonly price: number;
    
    @IsDate()
    firstRegistrationDate: Date;
    
    readonly owners: OwnerDto[];
}