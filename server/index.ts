import express from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import schema from "./schemas";
import path from "path";
import mongoose from "mongoose";

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

const app = express();
const port = process.env.PORT || 8000;
console.log(
  `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@localhost:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`
);

// connect to mongodb
mongoose.connect(
  `mongodb://localhost:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
  {
    user: process.env.MONGO_USERNAME,
    pass: process.env.MONGO_PASSWORD,
    authSource: "admin",
  }
);
mongoose.connection.once("open", () => {
  console.log("connected to database.");
});

// middlewares
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
