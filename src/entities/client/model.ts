import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "../order/model";
import { WatchedProducts } from "../watchedProducts/model";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];

  @OneToMany(() => WatchedProducts, (watchedProducts) => watchedProducts.client)
  watchedProducts: WatchedProducts[];
}
