import express from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello world!";
  },
};

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// middlewares
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
