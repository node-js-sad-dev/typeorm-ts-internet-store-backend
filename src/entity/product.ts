import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProductSpecs } from "./productSpecs";
import { OrderProduct } from "./orderProducts";
import { Category } from "./category";
import { WatchedProducts } from "./watchedProducts";
import { CartProduct } from "./cartProduct";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProducts: OrderProduct[];

  @OneToMany(() => ProductSpecs, (productSpecs) => productSpecs.product)
  specs: ProductSpecs[];

  @OneToMany(
    () => WatchedProducts,
    (watchedProducts) => watchedProducts.product
  )
  watchedProducts: WatchedProducts[];

  @ManyToMany(() => Category, (category) => category.products)
  categories: Category[];

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.product)
  cartProducts: CartProduct[];
}
