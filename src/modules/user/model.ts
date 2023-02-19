import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Order } from "../order/model";
import { WatchedProducts } from "../watchedProducts/model";
import { UserRole } from "./type";

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

  @Column({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => WatchedProducts, (watchedProducts) => watchedProducts.user)
  watchedProducts: WatchedProducts[];
}
