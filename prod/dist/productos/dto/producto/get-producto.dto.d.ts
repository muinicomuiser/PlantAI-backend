import { GetCategoriaDto } from '../categoria/get-categoria.dto';
import { GetPlantaDto } from '../planta/get-planta.dto';
import { GetMaceteroDto } from '../macetero/get-macetero.dto';
import { GetAccesorioDto } from '../accesorio/get-accesorio.dto';
import { GetInsumoDto } from '../insumo/get-insumo.dto';
export declare class GetProductoDto {
    id: number;
    SKU: string;
    nombre: string;
    idCategoria: number;
    precio: number;
    descripcion: string;
    imagen: string;
    cantidad: number;
    unidadesVendidas: number;
    puntuacion: number;
    ancho: number;
    alto: number;
    largo: number;
    peso: number;
    categoria: GetCategoriaDto;
    planta?: GetPlantaDto;
    macetero?: GetMaceteroDto;
    accesorio?: GetAccesorioDto;
    insumo?: GetInsumoDto;
}
