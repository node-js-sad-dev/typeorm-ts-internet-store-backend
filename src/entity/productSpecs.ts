import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./product";
import { ProductSpecType } from "../modules/product/type";

@Entity()
export class ProductSpecs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  specName: string;

  @Column()
  specValue: string;

  @Column({
    type: "enum",
    enum: ProductSpecType,
  })
  specType: ProductSpecType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Product, (product) => product.specs)
  product: Product;
}
