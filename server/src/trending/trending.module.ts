import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrendingController } from './trending.controller';
import { TrendingService } from './trending.service';
import config from '../config/config';
import { Order, OrderSchema } from './schemas/order.schema';

console.log('Config', config.MongoURI);

@Module({
  imports: [
    MongooseModule.forRoot(config.MongoURI),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [TrendingController],
  providers: [TrendingService],
})
export class TrendingModule {}
