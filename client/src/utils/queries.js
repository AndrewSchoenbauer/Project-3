import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user ($username: String!) {
    user(username: $username) {
        _id
        username
        trip{
            _id
            tripName
      }
    }
  }
`;

export const QUERY_TRIP = gql`
query Query {
  trips {
    _id
    tripName
    startDate
    endDate
   
  }
}`;