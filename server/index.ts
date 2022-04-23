import express from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import schema from "./schemas";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

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
