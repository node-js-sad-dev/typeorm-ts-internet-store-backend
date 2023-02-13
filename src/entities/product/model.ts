import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductSpecs } from "../productSpecs/model";
import { OrderProduct } from "../orderProducts/model";
import { Category } from "../category/model";
import { WatchedProducts } from "../watchedProducts/model";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

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
}
