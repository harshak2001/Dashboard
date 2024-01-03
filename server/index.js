import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

// data imports
import User from "./models/User.js";
import {
  dataProduct,
  dataProductStat,
  dataUser,
  dataTransaction,
  dataOverallStat,
} from "./data/index.js";

import Product from "./models/product.js";
import ProductStat from "./models/productStat.js";
import Transaction from "./models/transaction.js";
import OverallStat from "./models/overallStat.js";

// configuration middleware
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// routes

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// MONGOOSE SETUP

const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("DB CONNECTED SUCCESSFULLY ", PORT);
      /* ONLY ADD DATA ONE TIME */
      // OverallStat.insertMany(dataOverallStat);
      // Product.insertMany(dataProduct);
      // ProductStat.insertMany(dataProductStat);
      // User.insertMany(dataUser);
      // Transaction.insertMany(dataTransaction);
    });
  })
  .catch((error) => {
    console.log("DB Connection failed ", error);
  });
