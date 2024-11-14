import { GetCarroComprasDto } from '../dto/get-carro-compras.dto';
import { CarroCompra } from '../entities/carro.entity';
import { Repository } from 'typeorm';
import { AddProductCarro } from '../dto/add-product-carro';
import { Producto } from 'src/productos/entities/producto.entity';
import { CarroProducto } from '../entities/carro_producto.entity';
import { UpdateProductCarro } from '../dto/update-product-carro';
export declare class CarroComprasService {
    private readonly carroComprasRepository;
    private readonly productoRepository;
    private readonly carroProductoRepository;
    constructor(carroComprasRepository: Repository<CarroCompra>, productoRepository: Repository<Producto>, carroProductoRepository: Repository<CarroProducto>);
    createCarro(idUsuario: number): Promise<boolean>;
    findByCarroId(id: number): Promise<GetCarroComprasDto>;
    findByUserId(id: number): Promise<GetCarroComprasDto>;
    addProductToCarro(idCarro: number, addProductDto: AddProductCarro): Promise<import("../dto/get-carro-producto.dto").GetCarroProductoDto>;
    updateProductQuantity(idCarro: number, updateDto: UpdateProductCarro): Promise<UpdateProductCarro>;
    removeProductCarro(idCarro: number, idProducto: number): Promise<boolean>;
    deleteCarro(idCarro: number): Promise<{
        message: string;
    }>;
}
