import { Test, TestingModule } from '@nestjs/testing';
import { CarroComprasController } from './carro-compras.controller';
import { CarroComprasService } from '../service/carro-compras.service';

describe('CarroComprasController', () => {
  let controller: CarroComprasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarroComprasController],
      providers: [CarroComprasService],
    }).compile();

    controller = module.get<CarroComprasController>(CarroComprasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
