const graphql = require("graphql");
const _ = require('lodash');

const {GraphQLString, GraphQLInt, GraphQLID, GraphQLList, GraphQLSchema} = graphql; // grabbed poperties from quraphql package

// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
];
var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];

// define object types with different fields (wrapped inside function)
const BookType = new graphql.GraphQLObjectType({
    name: "Book",
    // fields have to be wrapped inside a function, because only then you can reference e.g. in BookType to AuthorType ans vice versa
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent);
                return _.find(authors, {id: parent.authorId});
            }
        }
    })
});
const AuthorType = new graphql.GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // just take book where authorId and parent.id match
                return _.filter(books, {authorId: parent.id})
            }
        }
    })
});

// define how to jump in the graph inside fields
// someone querys a book -> book: {} block (expectet type and arguments) -> resolve query
const RootQuery = new graphql.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // code to get data from db / other source -> may be any kind of database or file
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return _.find(authors, {id: args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }
    }
})

// define how the frontend can mutate the data
const Mutation = new graphql.GraphQLObjectType({
    name: "Mutation",
    fields: {
        // Example mutation:
        //  mutation {
        //      addAuthor(name: "Shaun", age: 15, id: 5) {
        //          name
        //          age
        //          id
        //      }
        //  }
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                let author = {
                    name: args.name,
                    age: args.age,
                    id: args.id
                };
                authors.push(author);
                return authors[authors.length - 1];
            }
        }
    }
})

// define new schema with desired options
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})