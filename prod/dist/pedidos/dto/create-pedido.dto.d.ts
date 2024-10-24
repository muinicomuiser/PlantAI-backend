import { CarroCompra } from 'src/carro-compras/entities/carros.entity';
export declare class CreatePedidoDto {
    idusuario: number;
    tipoDespacho: string;
    tipoPago: string;
    carrito: CarroCompra;
    fechaEntrega: Date;
}
