import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator"

export class CreateDireccionDto {

    @ApiProperty({ name: 'nombre', example: 'Juanito' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(25, {
        message: 'El nombre excede la extensión máxima de 25 caracteres',
    })
    nombre: string

    @ApiProperty({ name: 'apellido', example: 'Alcornoque' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(15, {
        message: 'El nombre excede la extensión máxima de 15 caracteres',
    })
    apellido: string

    @ApiProperty({ name: 'region', example: 'Región Metropolitana' })
    @IsString()
    @MaxLength(25, {
        message: 'Extensión muy larga',
    })
    region: string

    @ApiProperty({ name: 'comuna', example: 'Maipú' })
    @IsString()
    comuna: string

    @ApiProperty({ name: 'calle', example: 'San Lorenzo' })
    @IsString()
    @MaxLength(30, {
        message: 'El nombre de la calle excede el máximo de 30 caracteres',
    })
    calle: string

    @ApiProperty({ name: 'numero', example: '1300' })
    @IsString()
    numero: string

    @ApiProperty({ name: 'departamento', example: '1201' })
    @IsString()
    departamento: string
    @ApiProperty({ name: 'referencia', example: 'Al lado de la copec' })
    @IsString()
    @IsOptional()
    @MaxLength(30, {
        message: 'La referencia excede el máximo de caracteres',
    })
    referencia?: string
}