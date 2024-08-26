import { CarroCompra } from "src/carro-compras/entities/carro-compra.entity";
import { tipoPago } from "src/pedidos/entities/pago.enum";
import { Pedido } from "src/pedidos/entities/pedido.entity";

export class Usuario {
    public id: number;
    public name: string;
    public password: string;
    public email: string;
    public carrito: CarroCompra;
    public pedido: Pedido;
    public medioPago: tipoPago;

    constructor(id: number, name: string, password: string, email: string, carrito: CarroCompra, pedido: Pedido) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
        this.carrito = carrito;
        this.pedido = pedido;
    }
}
