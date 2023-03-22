const { request } = require('graphql-request');

const endpoint = 'http://localhost:4000/graphql';

const introspectionQuery = `
  {
    __schema {
      queryType {
        name
        kind
        fields {
          name
          type {
            name
            kind
            ofType {
              name
              kind
            }
          }
          args {
            name
            type {
              name
              kind
              ofType {
                name
                kind
              }
            }
          }
        }
      }
      mutationType {
        name
        kind
        fields {
          name
          type {
            name
            kind
            ofType {
              name
              kind
            }
          }
          args {
            name
            type {
              name
              kind
              ofType {
                name
                kind
              }
            }
          }
        }
      }
    }
  }
`;

async function getData() {
  const data = await request(endpoint, introspectionQuery);
  return data;
}

async function processData(data) {
    const queryFields = data.__schema.queryType.fields.map(field => ({
    name: field.name,
    type: field.type.name,
    kind: field.type.kind,
    ofType: field.type.ofType
      ? {
          name: field.type.ofType.name,
          kind: field.type.ofType.kind
        }
      : null,
    args: field.args.map(arg => ({
      name: arg.name,
      type: arg.type.name,
      kind: arg.type.kind,
      ofType: arg.type.ofType
        ? {
            name: arg.type.ofType.name,
            kind: arg.type.ofType.kind
          }
        : null
    }))
  }));
  const mutationFields = data.__schema.mutationType.fields.map(field => ({
    name: field.name,
    type: field.type.name,
    kind: field.type.kind,
    ofType: field.type.ofType
      ? {
          name: field.type.ofType.name,
          kind: field.type.ofType.kind
        }
      : null,
    args: field.args.map(arg => ({
      name: arg.name,
      type: arg.type.name,
      kind: arg.type.kind,
      ofType: arg.type.ofType
        ? {
            name: arg.type.ofType.name,
            kind: arg.type.ofType.kind
          }
        : null
    }))
  }));
  console.log('Query Fields: ', JSON.stringify(queryFields, null, 2));
  console.log('Mutation Fields: ', JSON.stringify(mutationFields, null, 2));

  console.log(data.__schema.mutationType.fields[0].args[0].type.ofType);
}

async function main() {
  const data = await getData();
  await processData(data);
}

main();
