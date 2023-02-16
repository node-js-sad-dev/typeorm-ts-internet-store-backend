import "reflect-metadata";

import { DataSource } from "typeorm";
import { Client } from "./modules/client/model";
import { Order } from "./modules/order/model";
import { OrderProduct } from "./modules/orderProducts/model";
import { Product } from "./modules/product/model";
import { ProductSpecs } from "./modules/productSpecs/model";
import { Category } from "./modules/category/model";
import { WatchedProducts } from "./modules/watchedProducts/model";
import { Wishlist } from "./modules/wishlist/model";
import { Token } from "./modules/token/model";

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
    Token,
  ],
  synchronize: true,
  logging: process.env.NODE_ENV === "dev" ? "all" : false,
  logger: "file",
});
