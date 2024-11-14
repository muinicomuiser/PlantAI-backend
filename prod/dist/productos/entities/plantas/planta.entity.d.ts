import { ColorProducto } from 'src/commons/entities/color.entity';
import { Producto } from '../producto.entity';
import { Especie } from './especie.entity';
import { TipoRiego } from './tipo_riego.entity';
import { Fotoperiodo } from './fotoperiodo.entity';
import { HabitoCrecimiento } from './habito_crecimiento.entity';
export declare class Planta {
    id_producto: number;
    petFriendly: boolean;
    toleranciaTemperatura: number;
    ciclo: boolean;
    altura: string;
    idEspecie: number;
    especie: Especie;
    idColor: number;
    color: ColorProducto;
    idFotoperiodo: number;
    fotoPeriodo: Fotoperiodo;
    idTipoRiego: number;
    tipoRiego: TipoRiego;
    idHabitoCrecimiento: number;
    habitoCrecimiento: HabitoCrecimiento;
    producto: Producto;
}
