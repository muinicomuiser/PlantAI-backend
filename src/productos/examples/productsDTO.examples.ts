import { ProductoSalidaDto } from "../dto/producto-salida.dto";
import { FotoPeriodo, TipoRiego } from "../entities/categorias";

// Instancias de productos Dto de ejemplo.
const plantaUnoDto: ProductoSalidaDto = new ProductoSalidaDto(
    'Ciprés',
    5000,
    'plantAI.com/imagenes/cipres.jpg',
    'Producto ejemplo. Primera planta de la tienda',
    5,
    'Conífera',
    FotoPeriodo.largo,
    TipoRiego.regadera,
    true,
    'verde',
);
plantaUnoDto.id = 1;
plantaUnoDto.puntuacion = 5;
plantaUnoDto.unidadesVendidas = 5;

const plantaDosDto: ProductoSalidaDto = new ProductoSalidaDto(
    'Espino',
    10000,
    'plantAI.com/imagenes/espino.jpg',
    'Producto ejemplo. Segunda planta de la tienda',
    10,
    'Leguminosa',
    FotoPeriodo.neutro,
    TipoRiego.inmersion,
    false,
    'verde',
);
plantaDosDto.id = 2;
plantaDosDto.puntuacion = 5;
plantaDosDto.unidadesVendidas = 10;

const plantaTresDto: ProductoSalidaDto = new ProductoSalidaDto(
    'Grevillea',
    15000,
    'plantAI.com/imagenes/grevillea.jpg',
    'Producto ejemplo. Tercera planta de la tienda',
    15,
    'Protácea',
    FotoPeriodo.corto,
    TipoRiego.goteo,
    false,
    'verde',
);
plantaTresDto.id = 3;
plantaTresDto.puntuacion = 3;
plantaTresDto.unidadesVendidas = 15;

const plantaCuatroDto: ProductoSalidaDto = new ProductoSalidaDto(
    'Juniperus-Azul',
    8000,
    'plantAI.com/imagenes/juniperus.jpg',
    'Producto ejemplo. Cuarta planta de la tienda',
    8,
    'Cupresáceas',
    FotoPeriodo.neutro,
    TipoRiego.regadera,
    false,
    'Verde',
);
plantaCuatroDto.id = 4;
plantaCuatroDto.puntuacion = 4;
plantaCuatroDto.unidadesVendidas = 10;

const plantaCincoDto: ProductoSalidaDto = new ProductoSalidaDto(
    'Agatea Verde',
    5000,
    'plantAI.com/imagenes/agatea.jpg',
    'Producto ejemplo. Quinta planta de la tienda',
    15,
    'Aesteraceae',
    FotoPeriodo.neutro,
    TipoRiego.regadera,
    false,
    'Verde',
);
plantaCincoDto.id = 5;
plantaCincoDto.puntuacion = 5;
plantaCincoDto.unidadesVendidas = 5;

const plantaSeisDto: ProductoSalidaDto = new ProductoSalidaDto(
    'Dólar blanco',
    20000,
    'plantAI.com/imagenes/dolarblanco.jpg',
    'Planta ejemplo. Sexta planta de la tienda',
    20,
    'Lamiaceae',
    FotoPeriodo.neutro,
    TipoRiego.regadera,
    true,
    'Verde con blanco',
);
plantaSeisDto.id = 6;
plantaSeisDto.puntuacion = 5;
plantaSeisDto.unidadesVendidas = 10;

const plantaSieteDto: ProductoSalidaDto = new ProductoSalidaDto(
    'Pennisetum Rubra',
    17000,
    'plantAI.com/imagenes/pennisetumrubra.jpg',
    'Planta ejemplo. Séptima planta de la tienda',
    15,
    'Poaceae',
    FotoPeriodo.largo,
    TipoRiego.regadera,
    true,
    'Roja',
);
plantaSieteDto.id = 7;
plantaSieteDto.puntuacion = 5;
plantaSieteDto.unidadesVendidas = 7;

const plantaOchoDto: ProductoSalidaDto = new ProductoSalidaDto(
    'Sedum japonicum',
    5000,
    'plantAI.com/imagenes/sedumjaponicum.jpg',
    'Planta ejemplo. Octava planta de la tienda',
    10,
    'Crasuláceas',
    FotoPeriodo.neutro,
    TipoRiego.regadera,
    true,
    'Verde',
);
plantaOchoDto.id = 8;
plantaOchoDto.puntuacion = 5;
plantaOchoDto.unidadesVendidas = 8;

const plantaNueveDto: ProductoSalidaDto = new ProductoSalidaDto(
    'Buganvilla',
    14000,
    'plantAI.com/imagenes/buganvilla.jpg',
    'Planta ejemplo. Novena planta de la tienda',
    5,
    'Nictagináceas',
    FotoPeriodo.neutro,
    TipoRiego.regadera,
    true,
    'Lila',
);
plantaNueveDto.id = 9;
plantaNueveDto.puntuacion = 5;
plantaNueveDto.unidadesVendidas = 25;

const plantaDiezDto: ProductoSalidaDto = new ProductoSalidaDto(
    'Jazmín del Cabo',
    30000,
    'plantAI.com/imagenes/jazmindelcabo.jpg',
    'Planta ejemplo. Décima planta de la tienda',
    5,
    'Rubiáceas',
    FotoPeriodo.neutro,
    TipoRiego.regadera,
    true,
    'Blanco',
);
plantaDiezDto.id = 10;
plantaDiezDto.puntuacion = 5;
plantaDiezDto.unidadesVendidas = 8;

/**Arreglo global de productos de ejemplo */
export const ProductsDtoExamples: ProductoSalidaDto[] = [
    plantaUnoDto,
    plantaDosDto,
    plantaTresDto,
    plantaCuatroDto,
    plantaCincoDto,
    plantaCincoDto,
    plantaSeisDto,
    plantaSieteDto,
    plantaOchoDto,
    plantaNueveDto,
    plantaDiezDto
]
