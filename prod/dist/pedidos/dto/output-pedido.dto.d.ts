import { CarroCompra } from 'src/carro-compras/entities/carros.entity';
export declare class OutputPedidoDto {
    id: number;
    idUsuario: number;
    fechaCreacion: Date;
    estado: string;
    tipoDespacho: string;
    tipoPago: string;
    carrito: CarroCompra;
    fechaEntrega: Date;
    constructor(idUsuario: number, estado: string, tipoDespacho: string, tipoPago: string, carrito: CarroCompra);
}
