import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import _ from "lodash";

const books = [
  {
    name: "National Geographic The 21st Century",
    id: "1",
    genre: "Fantasy",
  },
  {
    name: "This Will Not Pass: Trump, Biden, and the Battle for America's Future",
    id: "2",
    genre: "Fantasy",
  },
  {
    name: "Welcome to the Universe in 3D: A Visual Tour",
    id: "3",
    genre: "Sci-Fi",
  },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
