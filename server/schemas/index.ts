import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
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

const authors = [
  { name: "Francis Beresford", age: 39, id: "1" },
  { name: "Donovan Craig", age: 45, id: "2" },
  { name: "Jackson Tong", age: 32, id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
