"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("@apollo/server");
var standalone_1 = require("@apollo/server/standalone");
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
var books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];
var resolvers = {
    Query: {
        books: function () { return books; },
    },
};
var typeDefs = "#graphql\n  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.\n\n  # This \"Book\" type defines the queryable fields for every book in our data source.\n  type Book {\n    title: String\n    author: String\n  }\n\n  # The \"Query\" type is special: it lists all of the available queries that\n  # clients can execute, along with the return type for each. In this\n  # case, the \"books\" query returns an array of zero or more Books (defined above).\n  type Query {\n    books: [Book]\n  }\n";
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
var server = new server_1.ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
var url = (await (0, standalone_1.startStandaloneServer)(server, {
    listen: { port: 4000 },
})).url;
console.log("\uD83D\uDE80  Server ready at: ".concat(url));
