import { Injectable } from '@nestjs/common';
import { CreateCarroCompraDto } from './dto/create-carro-compra.dto';

@Injectable()
export class CarroComprasService {
    createCarro(carro: CreateCarroCompraDto) {
        return `crea carrito de compras`;
    }
    findByCarroId(id: number) {
        return `busca carrito de compras por id de carro`;
    }
    findByUserId(id: number) {
        return `busca carrito de compras por id de usuario`;
    }
    deleteCarro(id: number) {
        return `borra carrito de compras`;
    }
    updateCarro(id: number, carro: CreateCarroCompraDto) {
        return `actualiza carrito de compras`;
    }
}
