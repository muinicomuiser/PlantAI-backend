import { Injectable } from '@nestjs/common';

@Injectable()
export class CarroComprasService {
    findAll() {
        return `Implementar carrito de compras para añadir, eliminar y modificar productos`;
    }
}
