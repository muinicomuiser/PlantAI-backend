import { ApiProperty } from '@nestjs/swagger';

export class ProductoSalidaDto {
  @ApiProperty({
    example: 1,
    description: 'Generado automáticamente en el servidor.',
  })
  id: number;

  @ApiProperty({
    example: 'Ciprés',
    description: 'Nombre público del producto.',
  })
  nombre: string;

  @ApiProperty({ example: 5000, description: 'Precio de venta.' })
  precio: number;

  @ApiProperty({
    example: 'cotiledon.com/imagenes/cipres.jpg',
    description: 'URL de la imagen del producto.',
  })
  imagen: string;

  @ApiProperty({
    example: 'Producto ejemplo. Primera planta de la tienda.',
    description: 'Descripción del producto.',
  })
  descripcion: string;

  @ApiProperty({
    example: 5,
    description: 'Número de unidades del producto en stock.',
  })
  cantidad: number; //Stock

  @ApiProperty({
    example: 5,
    description: 'Número de unidades del producto vendidas.',
  })
  unidadesVendidas: number;

  @ApiProperty({
    example: 5,
    description:
      'Puntuación en escala numérica que los usuarios le han dado al producto.',
  })
  puntuacion: number;

  @ApiProperty({
    example: 'Conífera',
    description: 'Famila a la que pertenece la planta.',
  })
  familia: string;

  @ApiProperty({
    description: 'Fotoperíodo óptimo para la planta.',
  })
  fotoperiodo: string;

  @ApiProperty({
    description: 'Tipo de riego óptimo para la planta.',
  })
  tipoRiego: string;

  @ApiProperty({
    example: true,
    description: 'Boolean que describe si la planta es o no es Pet Friendly',
  })
  petFriendly: boolean;

  @ApiProperty({ example: 'verde', description: 'Color de la planta.' })
  color: string;

  constructor(
    nombre: string,
    precio: number,
    imagen: string = '',
    descripcion: string = '',
    cantidad: number = 0,
    familia: string = '',
    fotoperiodo: string = undefined,
    tipoRiego: string = undefined,
    petFriendly: boolean = false,
    color: string = '',
  ) {
    //Propiedades
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.descripcion = descripcion;
    this.cantidad = cantidad;

    //Atributos de inventario
    this.unidadesVendidas = 0;
    this.puntuacion = 0;

    //Atributos de categorías
    this.familia = familia;
    this.fotoperiodo = fotoperiodo;
    this.tipoRiego = tipoRiego;
    this.petFriendly = petFriendly;
    this.color = color;
  }
}
