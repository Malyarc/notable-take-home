import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { TrendingController } from './trending.controller';
import { TrendingService } from './trending.service';
import config from '../config/config';
import { Order, OrderSchema } from './schemas/order.schema';

describe('TrendingController', () => {
  let controller: TrendingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrendingController],
      providers: [TrendingService],
      imports: [
        MongooseModule.forRoot(config.MongoURI),
        MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
      ],
    }).compile();

    controller = module.get<TrendingController>(TrendingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
