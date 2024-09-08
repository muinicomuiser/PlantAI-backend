import { Test, TestingModule } from '@nestjs/testing';
import { CarroComprasService } from '../carro-compras.service';

describe('CarroComprasService', () => {
  let service: CarroComprasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarroComprasService],
    }).compile();

    service = module.get<CarroComprasService>(CarroComprasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
