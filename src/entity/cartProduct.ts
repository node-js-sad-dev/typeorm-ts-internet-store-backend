import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Product } from "./product";

@Entity()
export class CartProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.cartProducts)
  user: User;

  @ManyToOne(() => Product, (product) => product.cartProducts)
  product: Product;
}
