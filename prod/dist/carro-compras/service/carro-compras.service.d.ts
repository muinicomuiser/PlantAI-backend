import { CreateCarroCompraDto } from '../dto/create-carro-compra.dto';
import { UpdateCarroCompraDto } from '../dto/update-carro-compra.dto';
import { OutputCarroComprasDto } from '../dto/output-carro-compras.dto';
import { CarroCompra } from '../entities/carro-compra.entity';
export declare class CarroComprasService {
    carrosCompra: CarroCompra[];
    constructor();
    createCarro(carro: CreateCarroCompraDto): OutputCarroComprasDto;
    findByCarroId(id: number): OutputCarroComprasDto;
    findByUserId(id: number): OutputCarroComprasDto;
    deleteCarro(id: number): boolean;
    updateCarro(id: number, carro: UpdateCarroCompraDto): OutputCarroComprasDto;
}
