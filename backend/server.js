const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const schema = require("./schema/schema");

// express.js as backend web app framework for building RESTful APIs with Node.js
const app = express();

// use express-graphql that the express server can run a graphql API
// when this root is requested use the graphglHTTP function (from express-graphql) to handle request
app.use("/graphql", graphqlHTTP({
  schema: schema, // could also just write schema because same name (ES6)
  graphiql: true,
}));

app.listen(4000, ()=>{
  console.log("Now listining for requests on port 4000");
});
