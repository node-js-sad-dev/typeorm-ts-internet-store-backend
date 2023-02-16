import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../order/model";
import { Product } from "../product/model";

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderProducts)
  product: Product;
}
