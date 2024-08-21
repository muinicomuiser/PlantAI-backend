import { Injectable } from '@nestjs/common';
import { Producto } from './entities/producto.entity';
import { FotoPeriodo, TipoRiego } from './entities/categorias';

@Injectable()
export class ProductosService {
    
    /**Productos registrados.*/
    productos: Producto[] = []
    
    constructor(){
        // Inicia el arreglo de plantas con tres plantas de ejemplo.
        this.productos.push(plantaUno, plantaDos, plantaTres)
    }

    /**Retorna el producto cuyo id coincida con el ingresado.           
     * Si no encuentra coincidencias, retorna undefined.*/
    obtenerPorId(id: number): Producto{
        return this.productos.find((producto)=> producto.id == id);
    }

    /**Retorna el conjunto de productos que coincida con los filtros.       
     * Si no se ingresan argumentos, retorna todos los productos registrados.           
     * Filtros: "nombre", "especie", "fotoperiodo", "tipo riego", "pet friendly", "color".
    */
    obtenerPorFiltros(nombre: string, especie: string, fotoperiodo: FotoPeriodo, tipoRiego: TipoRiego, petFriendly: boolean, color: string): Producto[]{
        let filtrados: Producto[] = this.productos;
        if(nombre){
            filtrados = filtrados.filter((producto)=> this.normalizarPalabra(producto.nombre).includes(this.normalizarPalabra(nombre)));
        }
        if(especie){
            filtrados = filtrados.filter((producto)=> this.normalizarPalabra(producto.especie).includes(this.normalizarPalabra(especie)));
        }
        if(fotoperiodo){
            filtrados = filtrados.filter((producto)=> producto.fotoperiodo == fotoperiodo);
        }
        if(tipoRiego){
            filtrados = filtrados.filter((producto)=> producto.tipoRiego == tipoRiego);
        }
        if(petFriendly != null){
            filtrados = filtrados.filter((producto)=> producto.petFriendly == petFriendly);
        }
        if(color){
            filtrados = filtrados.filter((producto)=> this.normalizarPalabra(producto.color).includes(this.normalizarPalabra(color)));
        }
        return filtrados;
    }

    /**Retorna todos los productos registrados. */
    obtenerTodos(): Producto[] {
        return this.productos;
        // return `Implementar funcionalidad de búsqueda de productos`;
    }


    //Métodos utilitarios.

    /**Recibe un string con mayúsculas y tildes y retorna un string nuevo con minúsculas y sin tildes.        */
    normalizarPalabra(palabra: string): string{
        let palabraNormalizado: string = palabra.toLowerCase();
        const vocalesAcentuadas: string[] = ['á', 'é', 'í', 'ó', 'ú'];
        const vocales: string[] = ['a', 'e', 'i', 'o', 'u'];
        for(let i in vocalesAcentuadas){
            while(palabraNormalizado.indexOf(vocalesAcentuadas[i]) != -1){
                palabraNormalizado = palabraNormalizado.replace(vocalesAcentuadas[i], vocales[i]);
            }        
        }
        return palabraNormalizado;
    }
}

// Instancias de productos de ejemplo.
const plantaUno: Producto = new Producto('Unila', 5000, 'cotiledon.com/imagenes/unila.jpg', 'Primera planta de la tienda', 5, 
                                        'conifera', FotoPeriodo.largo, TipoRiego.regadera, true, 'verde');
plantaUno.id = 1;

const plantaDos: Producto = new Producto('Dorila', 10000, 'cotiledon.com/imagenes/dorila.jpg', 'Segunda planta de la tienda', 10, 
                                        'magnólida', FotoPeriodo.neutro, TipoRiego.inmersion, false, 'rosado' );
plantaDos.id = 2;

const plantaTres: Producto = new Producto('Tirifila', 15000, 'cotiledon.com/imagenes/tirifila.jpg', 'Tercera planta de la tienda', 15, 
                                        'liliopsida', FotoPeriodo.corto, TipoRiego.goteo, false, 'lila');
plantaTres.id = 3;
