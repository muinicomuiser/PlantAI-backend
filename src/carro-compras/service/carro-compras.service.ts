import { Injectable } from '@nestjs/common';
import { CreateCarroCompraDto } from '../dto/create-carro-compra.dto';
import { UpdateCarroCompraDto } from '../dto/update-carro-compra.dto';
import { OutputCarroComprasDto } from '../dto/output-carro-compras.dto';
import { CarroCompra } from '../entities/carro-compra.entity';
import { FotoPeriodo, TipoRiego } from 'src/productos/entities/categorias';
import { Producto } from 'src/productos/entities/producto.entity';

@Injectable()
export class CarroComprasService {

  carrosCompra: CarroCompra[] = [carroCompra];
  constructor() { }

  createCarro(carro: CreateCarroCompraDto): OutputCarroComprasDto {
    return this.carrosCompra[0];
  }

  findByCarroId(id: number): OutputCarroComprasDto {
    return this.carrosCompra[0];
  }

  findByUserId(id: number): OutputCarroComprasDto {
    return this.carrosCompra[0];
  }

  deleteCarro(id: number): boolean {
    return true;
  }

  updateCarro(id: number, carro: UpdateCarroCompraDto): OutputCarroComprasDto {
    return this.carrosCompra[0];
  }
}

// Instancia de carro de compras de ejemplo.
const plantaUno: Producto = new Producto(
  'Ciprés',
  5000,
  'cotiledon.com/imagenes/cipres.jpg',
  'Producto ejemplo. Primera planta de la tienda',
  5,
  'Conífera',
  FotoPeriodo.largo,
  TipoRiego.regadera,
  true,
  'verde',
);
plantaUno.id = 1;
plantaUno.puntuacion = 5;
plantaUno.unidadesVendidas = 5;
const carroCompra: CarroCompra = {
  id: 1,
  idUsuario: 1,
  productos: [plantaUno],
  precioTotal: plantaUno.precio,
};
