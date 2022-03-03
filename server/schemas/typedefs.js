const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    trip: [Trip]!
  }
  type Trip {
      _id: ID
      tripName: String
      startDate: String
      endDate: String
      users: [User]!
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    users: [User]
    user(username: String!): User
    trips: [Trip]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTrip(tripName: String!, startDate: String!, endDate: String!): Auth
  }`

  module.exports = typeDefs;