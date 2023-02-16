import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "../client/model";
import { Product } from "../product/model";

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, (client) => client.watchedProducts)
  client: Client;

  @ManyToOne(() => Product, (product) => product.watchedProducts)
  product: Product;
}
