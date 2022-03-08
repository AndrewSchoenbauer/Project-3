import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }`;

  export const ADD_TRIP = gql`
  mutation addTrip($tripName: String!, $startDate: String!, $endDate: String!) {
    addTrip(tripName: $tripName, startDate: $startDate, endDate: $endDate) {
     _id
    tripName
    startDate
    endDate
        expenses {
          expenseAuthor
          expenseDescription
          quantity 
          price
        }
      }
    }`


  export const ADD_USER_TO_TRIP = gql`
  mutation AddUserToTrip($tripId: ID!, $userId: ID!) {
    addUserToTrip(tripId: $tripId, userId: $userId) {
      tripName
      users {
        username
      }
    }
  }
  `;

  export const ADD_EXPENSE =gql`
  mutation addExpense(
    $tripId: ID
    $expenseDescription: String
    $price: Int 
    $quantity: Int
    $expenseAuthor: String
    ) {
    addExpense(
      tripId: $tripId
      expenseDescription: $expenseDescription
      price: $price 
      quantity: $quantity 
      expenseAuthor: $expenseAuthor
      ) {
      _id  
      tripName
      startDate
      endDate
      expenses {
        expenseDescription
        price
        quantity
        expenseAuthor
      }
    }
  }`