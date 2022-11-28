const graphql = require("graphql");
const _ = require('lodash');

const {GraphQLQbjectType, GraphQLString, GraphQLSchema} = graphql; // grabbed poperties from quraphql package

// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' },
];

// define object type "book" with different fields (wrapped inside function)
const BookType = new graphql.GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

// define how to jump in the graph inside fields
// someone querys a book -> book: {} block (expectet type and arguments) -> resolve query
const RootQuery = new graphql.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                // code to get data from db / other source -> may be any kind of database or file
                return _.find(books, { id: args.id });
            }
        }
    }
})

// define new schema with desired options
module.exports = new GraphQLSchema({
    query: RootQuery
})