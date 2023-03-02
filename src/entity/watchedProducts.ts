import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Product } from "./product";

@Entity()
export class WatchedProducts {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.watchedProducts)
  user: User;

  @ManyToOne(() => Product, (product) => product.watchedProducts)
  product: Product;
}
