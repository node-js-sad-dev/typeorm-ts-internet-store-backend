import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Order } from "./order";
import { WatchedProducts } from "./watchedProducts";
import { CartProduct } from "./cartProduct";
import { UserAuth } from "./userAuth";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  address: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column()
  password: string;

  @Column()
  passwordSalt: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => WatchedProducts, (watchedProducts) => watchedProducts.user)
  watchedProducts: WatchedProducts[];

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.user)
  cartProducts: CartProduct[];

  @OneToMany(() => UserAuth, (userAuth) => userAuth.user)
  auths: UserAuth[];
}
