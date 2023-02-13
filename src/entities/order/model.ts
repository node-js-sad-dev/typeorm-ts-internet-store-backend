import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "../client/model";
import { OrderProduct } from "../orderProducts/model";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "money" })
  price: number;

  @ManyToOne(() => Client, (client) => client.orders)
  client: Client;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  orderProducts: OrderProduct[];
}
