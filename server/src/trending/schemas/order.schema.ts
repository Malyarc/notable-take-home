import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({
    type: Number,
    required: true,
  })
  orderId: number;

  @Prop({
    type: [
      {
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    required: true,
  })
  products: [
    {
      name: string;
      price: number;
      quantity: number;
    },
  ];

  @Prop({
    type: Number,
    required: true,
  })
  totalPrice: number;

  @Prop({
    type: String,
    default: 'USD',
  })
  currency: string;

  @Prop({
    type: Date,
    required: true,
  })
  purchasedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
