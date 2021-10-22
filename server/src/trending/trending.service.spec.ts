import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { TrendingService } from './trending.service';
import config from '../config/config';
import { Order, OrderSchema } from './schemas/order.schema';

describe('TrendingService', () => {
  let service: TrendingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrendingService],
      imports: [
        MongooseModule.forRoot(config.MongoURI),
        MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
      ],
    }).compile();

    service = module.get<TrendingService>(TrendingService);
  });

  it('Status should return "Up and running..."', async () => {
    expect(await service.getStatus()).toBe('Up and running...');
  });

  it('GetTotal should return count', async () => {
    expect(await service.getTotalOrders()).toBeGreaterThanOrEqual(0);
  });
});
