import { CarroComprasService } from '../service/carro-compras.service';
import { CreateCarroCompraDto } from '../dto/create-carro-compra.dto';
import { UpdateCarroCompraDto } from '../dto/update-carro-compra.dto';
import { OutputCarroComprasDto } from '../dto/output-carro-compras.dto';
export declare class CarroComprasController {
    private readonly carroComprasService;
    constructor(carroComprasService: CarroComprasService);
    createCarro(carro: CreateCarroCompraDto): OutputCarroComprasDto;
    findByCarroId(id: number): OutputCarroComprasDto;
    findByUserId(id: number): OutputCarroComprasDto;
    deleteCarro(id: number): boolean;
    updateCarro(carro: UpdateCarroCompraDto, id: number): OutputCarroComprasDto;
}
