import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator"

export class CreateDireccionDto {

    @ApiProperty({ name: 'nombre', example: 'Juanito', required: false })
    @IsString()
    @IsNotEmpty()
    @MaxLength(25, {
        message: 'El nombre excede la extensión máxima de 25 caracteres',
    })
    @IsOptional()
    nombre?: string

    @ApiProperty({ name: 'apellido', example: 'Alcornoque', required: false })
    @IsString()
    @IsNotEmpty()
    @MaxLength(15, {
        message: 'El nombre excede la extensión máxima de 15 caracteres',
    })
    @IsOptional()
    apellido?: string

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

    @ApiProperty({ name: 'departamento', example: '1201', required: false })
    @MaxLength(4)
    @IsString()
    @IsOptional()
    departamento?: string

    @ApiProperty({ name: 'referencia', example: 'Al lado de la copec', required: false })
    @IsString()
    @MaxLength(30, {
        message: 'La referencia excede el máximo de caracteres',
    })
    @IsOptional()
    referencia?: string
}