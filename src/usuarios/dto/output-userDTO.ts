import { ApiProperty } from '@nestjs/swagger';
import { GetCarroComprasDto } from 'src/carro-compras/dto/get-carro-compras.dto';
import { Pedido } from 'src/pedidos/entities/pedido.entity';

export class OutputUserDTO {
  @ApiProperty({ example: 'New Name' })
  public name: string;

  @ApiProperty({ example: 'updateduser@gmail.com' })
  public email: string;

  @ApiProperty()
  public carrito: GetCarroComprasDto;

  @ApiProperty()
  public pedidos: Pedido[];

  constructor(
    name: string,
    email: string,
    carrito: GetCarroComprasDto,
    pedido: Pedido[],
  ) {
    this.name = name;
    this.email = email;
    this.carrito = carrito;
    this.pedidos = pedido;
  }
}
