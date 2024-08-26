import { ApiProperty } from "@nestjs/swagger";
import { OutputCarroComprasDto } from "src/carro-compras/dto/output-carro-compras.dto";
import { CarroCompra } from "src/carro-compras/entities/carro-compra.entity";
import { Pedido } from "src/pedidos/entities/pedido.entity";

export class OutputUserDTO {
    @ApiProperty()
    public name: string;
    @ApiProperty()
    public email: string;
    @ApiProperty()
    public carrito: OutputCarroComprasDto;
    @ApiProperty()
    public pedido: Pedido;
    constructor(name: string, email: string, carrito: OutputCarroComprasDto, pedido: Pedido) {
        this.name = name;
        this.email = email;
        this.carrito = carrito;
        this.pedido = pedido;
    }
}