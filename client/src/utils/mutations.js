import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
    mutation addUser(
        $firstName: String!
        $email: String!
         $password: String!
     ) {
     addUser(
      firstName: $firstName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const SAVE_BOOK = gql`
    mutation saveBook ($book: [ID]!) {
            _id
            authors
            description
            image
            link
            title
      }
    `;

export const REMOVE_BOOK = gql`
    mutation removeBook ($book: [ID]!) {
            _id
            authors
            description
            image
            link
            title
      }
    `;