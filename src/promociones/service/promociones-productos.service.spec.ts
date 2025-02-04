import { Test, TestingModule } from '@nestjs/testing';
import { PromocionesProductosService } from './promociones-productos.service';

describe('PromocionesProductosService', () => {
  let service: PromocionesProductosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromocionesProductosService],
    }).compile();

    service = module.get<PromocionesProductosService>(PromocionesProductosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
