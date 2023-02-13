import "reflect-metadata";

import { DataSource } from "typeorm";
import { Client } from "./entities/client/model";
import { Order } from "./entities/order/model";
import { OrderProduct } from "./entities/orderProducts/model";
import { Product } from "./entities/product/model";
import { ProductSpecs } from "./entities/productSpecs/model";
import { Category } from "./entities/category/model";
import { WatchedProducts } from "./entities/watchedProducts/model";
import { Wishlist } from "./entities/wishlist/model";

const {
  DB_HOST = "localhost",
  DB_PORT = "5432",
  DB_USER = "postgres",
  DB_PASSWORD = "password",
  DB_NAME = "typeorm_internet_store",
} = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [
    Client,
    Order,
    OrderProduct,
    Product,
    ProductSpecs,
    Category,
    WatchedProducts,
    Wishlist,
  ],
  synchronize: true,
  logging: false,
});
