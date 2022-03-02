const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    trips: [Trip]!
  }
  type Trip{
      _id: ID
      tripName: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    users: [User]}

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
  }`

  module.exports = typeDefs;