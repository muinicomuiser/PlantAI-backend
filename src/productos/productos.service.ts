import { Injectable } from '@nestjs/common';
import { FotoPeriodo, TipoRiego } from './entities/categorias';
import { ProductoSalidaDto } from './dto/producto-salida.dto';

@Injectable()
export class ProductosService {
    
    /**Retorna el producto cuyo id coincida con el ingresado.*/
    obtenerPorId(id: number): ProductoSalidaDto{
        return plantaUnoDto;
    }

    /**Retorna el conjunto de productos que coincida con los filtros.*/
    obtenerPorFiltros(nombre: string, familia: string, fotoperiodo: FotoPeriodo, tipoRiego: TipoRiego, petFriendly: boolean, color: string): ProductoSalidaDto[]{
        let filtrados: ProductoSalidaDto[] = [plantaUnoDto, plantaDosDto, plantaTresDto];
        return filtrados;
    }

    /**Retorna todos los productos registrados.*/
    obtenerTodos(): ProductoSalidaDto[] {
        let productos: ProductoSalidaDto[] = [plantaUnoDto, plantaDosDto, plantaTresDto]
        return productos;
    }
}

// Instancias de productos Dto de ejemplo.
const plantaUnoDto: ProductoSalidaDto = new ProductoSalidaDto('Ciprés', 5000, 'cotiledon.com/imagenes/cipres.jpg', 'Producto ejemplo. Primera planta de la tienda', 5, 
                                        'Conífera', FotoPeriodo.largo, TipoRiego.regadera, true, 'verde');
plantaUnoDto.id = 1;

const plantaDosDto: ProductoSalidaDto = new ProductoSalidaDto('Espino', 10000, 'cotiledon.com/imagenes/espino.jpg', 'Producto ejemplo. Segunda planta de la tienda', 10, 
                                        'Leguminosa', FotoPeriodo.neutro, TipoRiego.inmersion, false, 'verde' );
plantaDosDto.id = 2;

const plantaTresDto: ProductoSalidaDto = new ProductoSalidaDto('Grevillea', 15000, 'cotiledon.com/imagenes/grevillea.jpg', 'Producto ejemplo. Tercera planta de la tienda', 15, 
                                        'Protácea', FotoPeriodo.corto, TipoRiego.goteo, false, 'verde');
plantaTresDto.id = 3;
