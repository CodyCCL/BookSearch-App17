const typeDefs = `

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: String!
    savedBooks: [Book]
  }

  type Book {
    _bookId: ID!
    authors: [authors]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    User: [User]
    book(_id: String): [Book]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(authors: [authors], description: String, title: String, _bookId: ID!, image: String, link: String): User
    removeBook(_bookId: String!): User
  }
`;

module.exports = typeDefs;