import { Controller, Get, HttpCode } from '@nestjs/common';
import { TrendingService } from './trending.service';

@Controller('trending')
export class TrendingController {
  constructor(private readonly appService: TrendingService) {}

  @Get('status')
  @HttpCode(200)
  async getStatus(): Promise<string> {
    return await this.appService.getStatus();
  }

  @Get('count')
  @HttpCode(200)
  async getTotalOrders(): Promise<number> {
    return await this.appService.getTotalOrders();
  }
}
