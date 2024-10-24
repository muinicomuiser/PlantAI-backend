import { CreateCarroCompraDto } from '../dto/create-carro-compra.dto';
import { UpdateCarroCompraDto } from '../dto/update-carro-compra.dto';
import { OutputCarroComprasDto } from '../dto/output-carro-compras.dto';
export declare class CarroComprasService {
    constructor();
    createCarro(carro: CreateCarroCompraDto): OutputCarroComprasDto;
    findByCarroId(id: number): OutputCarroComprasDto;
    findByUserId(id: number): OutputCarroComprasDto;
    deleteCarro(id: number): boolean;
    updateCarro(id: number, carro: UpdateCarroCompraDto): OutputCarroComprasDto;
}
