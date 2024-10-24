import { Injectable } from '@nestjs/common';
import { CreateCarroCompraDto } from '../dto/create-carro-compra.dto';
import { UpdateCarroCompraDto } from '../dto/update-carro-compra.dto';
import { OutputCarroComprasDto } from '../dto/output-carro-compras.dto';
import { CarroCompra } from '../entities/carros.entity';

@Injectable()
export class CarroComprasService {
  constructor() {}

  createCarro(carro: CreateCarroCompraDto): OutputCarroComprasDto {
    return null;
  }

  findByCarroId(id: number): OutputCarroComprasDto {
    return null;
  }

  findByUserId(id: number): OutputCarroComprasDto {
    return null;
  }

  deleteCarro(id: number): boolean {
    return true;
  }

  updateCarro(id: number, carro: UpdateCarroCompraDto): OutputCarroComprasDto {
    return null;
  }
}
