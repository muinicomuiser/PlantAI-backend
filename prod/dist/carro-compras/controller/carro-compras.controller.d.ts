import { GetCarroComprasDto } from '../dto/get-carro-compras.dto';
import { CarroComprasService } from '../service/carro-compras.service';
import { AddProductCarro } from '../dto/add-product-carro';
import { UpdateProductCarro } from '../dto/update-product-carro';
export declare class CarroComprasController {
    private readonly carroComprasService;
    constructor(carroComprasService: CarroComprasService);
    findByCarroId(id: number): Promise<GetCarroComprasDto>;
    findByUserId(id: number): Promise<GetCarroComprasDto>;
    createCarro(idUsuario: number): Promise<boolean>;
    deleteCarro(idCarro: number): Promise<boolean>;
    addProductToCarro(idCarro: number, addProductDto: AddProductCarro): Promise<import("../dto/get-carro-producto.dto").GetCarroProductoDto>;
    updateProductQuantity(idCarro: number, updateDto: UpdateProductCarro): Promise<UpdateProductCarro>;
    removeProductCarro(idCarro: number, idProducto: number): Promise<boolean>;
}
