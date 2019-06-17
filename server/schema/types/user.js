const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: { email: { type: GraphQLString }, _id: { type: GraphQLID } }
});

module.exports = UserType;
