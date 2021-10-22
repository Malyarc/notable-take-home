import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class TrendingService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  /**
   * Get a status check on weather service is running
   * @returns Promise<string>
   */
  async getStatus(): Promise<string> {
    return 'Up and running...';
  }

  /**
   * Get total number of orders in db
   * @returns Promise<number>
   */
  async getTotalOrders(): Promise<number> {
    try {
      return await this.orderModel.count().exec();
    } catch (err) {
      console.log('Error thrown while querying db: ', err);
      throw new HttpException(
        {
          status: HttpStatus.SERVICE_UNAVAILABLE,
          error: 'Oops! Something went wrong!',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
