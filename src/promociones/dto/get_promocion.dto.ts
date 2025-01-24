import { ApiProperty } from "@nestjs/swagger";

export class GetPromocionDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    nombre: string;
    @ApiProperty()
    descripcion: string;

    /**Si el tipoPromocion es "PORCENTAJE", valor será el porcentaje de descuento, y si es "FIJO", valor será el precio final del producto*/
    @ApiProperty()
    valor: number;
    @ApiProperty()
    fechaInicio: Date;
    @ApiProperty()
    fechaTermino: Date;

    /**"CUPON" o "TRADICIONAL", depende de si hay que validarla con cupón o se aplica automáticamente.*/
    @ApiProperty()
    tipoPromocion: string;

    /**"PORCENTAJE" o "FIJO", si se rebajará el precio por porcentaje o se reemplaza el precio del producto.*/
    @ApiProperty()
    tipoDescuento: string;

    /**"TODOS" o "SELECCIONADOS", si aplica para todos los productos o a los productos asignados a la promoción.*/
    @ApiProperty()
    tipoSeleccionProductos: string;

    /**"TODOS" o "SELECCIONADOS", si aplica para todos los productos o a los productos asignados a la promoción.*/
    @ApiProperty()
    habilitado: boolean;
}