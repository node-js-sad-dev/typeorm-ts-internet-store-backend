import "reflect-metadata";

import { DataSource } from "typeorm";
import { User } from "./entity/user";
import { Order } from "./entity/order";
import { OrderProduct } from "./entity/orderProducts";
import { Product } from "./entity/product";
import { ProductSpecs } from "./entity/productSpecs";
import { Category } from "./entity/category";
import { WatchedProducts } from "./entity/watchedProducts";
import { Wishlist } from "./entity/wishlistProducts";
import { Worker } from "./entity/worker";
import { CartProduct } from "./entity/cartProduct";
import { UserAuth } from "./entity/userAuth";
import { WorkerAuth } from "./entity/workerAuth";

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
    User,
    UserAuth,
    Order,
    OrderProduct,
    Product,
    ProductSpecs,
    Category,
    WatchedProducts,
    Wishlist,
    Worker,
    WorkerAuth,
    CartProduct,
  ],
  synchronize: true,
  logging: process.env.NODE_ENV === "dev" ? "all" : false,
  logger: "file",
});
