import { IsString, IsDate } from "class-validator";

export class OwnerDto {
    @IsString()
    readonly name: string;

    @IsDate()
    purchaseDate: Date;
}