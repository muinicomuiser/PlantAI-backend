import { CarroCompra } from "src/carro-compras/entities/carro-compra.entity";
import { tipoPago } from "src/pedidos/entities/pago.enum";
import { Pedido } from "src/pedidos/entities/pedido.entity";

export class Usuario {
    public id: number;
    public username: string;
    public password: string;
    public email: string;
    public carrito: CarroCompra;
    public pedidos: Pedido[];
    public medioPago: tipoPago;

    constructor(id: number, name: string, password: string, email: string, carrito: CarroCompra, pedidos: Pedido[]) {
        this.id = id;
        this.username = name;
        this.password = password;
        this.email = email;
        this.carrito = carrito;
        this.pedidos = pedidos;
    }
}
// Agregar dirección de envío
