import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { Producto } from 'src/productos/entities/producto.entity';
import { Repository } from 'typeorm';
export declare class ProductoExistentePipe implements PipeTransform {
    private readonly productoRepository;
    constructor(productoRepository: Repository<Producto>);
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
}
