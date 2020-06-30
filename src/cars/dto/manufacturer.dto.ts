import { IsString, IsNumber } from "class-validator";

export class ManufacturerDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly phone: string;

    @IsNumber()
    readonly siret: number;
}