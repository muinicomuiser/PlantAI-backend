import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive } from "class-validator";

export class UpdateProductCarro {
  @ApiProperty()
  @IsInt({ message: 'El ID de producto debe ser un número entero' })
  @IsPositive({ message: 'El ID de producto debe ser un número positivo' })
  productoId: number;

  @ApiProperty({ example: 2 })
  @IsInt({ message: 'La cantidad debe ser un número entero' })
  @IsPositive({ message: 'La cantidad debe ser un número positivo' })
  cantidadProducto: number;
}
