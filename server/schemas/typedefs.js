const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    trips: [Trip]!
  }
  type Expense {
    expenseDescription: String
    price: Int
    quantity: Int
    expenseAuthor: String
  }
  type Trip {
      _id: ID
      tripName: String
      startDate: String
      endDate: String
      expenses: [Expense]
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
    trip(tripId: ID!): Trip
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTrip(tripName: String!, startDate: String!, endDate: String! tripCreator: String!): Trip
    addExpense(
      tripId: ID
      expenseDescription: String
      price: Int
      quantity: Int
      expenseAuthor: String
    ): Trip
    addUserToTrip(
    tripId: ID!
    userId: ID!    
    ): Trip
    removeExpense(tripId: ID!, expenseId: ID!): Trip
    removeUser(tripId: ID!, userId: ID!): Trip
  }`

  module.exports = typeDefs;