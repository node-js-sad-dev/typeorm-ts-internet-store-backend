import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/model";
import { Product } from "../product/model";

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.watchedProducts)
  user: User;

  @ManyToOne(() => Product, (product) => product.watchedProducts)
  product: Product;
}
