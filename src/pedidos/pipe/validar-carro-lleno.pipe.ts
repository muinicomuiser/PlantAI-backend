import { ArgumentMetadata, BadRequestException, Inject, Injectable, PipeTransform } from '@nestjs/common';
import { GetCarroComprasDto } from 'src/carro-compras/dto/get-carro-compras.dto';
import { CarroComprasService } from 'src/carro-compras/service/carro-compras.service';

@Injectable()
export class ValidarCarroLlenoPipe implements PipeTransform {
  constructor(
    @Inject(CarroComprasService)
    private readonly carroComprasService: CarroComprasService
  ) { }
  async transform(value: any, metadata: ArgumentMetadata) {
    const carroEncontrado: GetCarroComprasDto = await this.carroComprasService.findByUserId(value);

    console.log(carroEncontrado.carroProductos)
    if (carroEncontrado.carroProductos.length == 0) {
      throw new BadRequestException('El carro del usuario está vacío.');
    }
    return value;
  }
}
