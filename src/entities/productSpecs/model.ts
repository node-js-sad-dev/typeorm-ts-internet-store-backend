import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../product/model";
import { ProductSpecType } from "./type";

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

  @ManyToOne(() => Product, (product) => product.specs)
  product: Product;
}
