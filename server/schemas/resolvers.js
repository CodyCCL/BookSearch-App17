const { createUser } = require('../controllers/user-controller');
const { User, Book } = require('../models');

const resolvers = {
  Query: {
    User: async () => {
      return User.find({});
    },
    Book: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Book.find(params);
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const User = await User.create(args);
      return User;
    },

    SaveBook: async (parent, { _id }) => {
      const saved = await User.findOneAndUpdate(
        { _id },
        { new: true }
      );
      return saved;
    },

    deleteBook: async (parent, { _id }) => {
      const deleted = await User.findOneAndUpdate(
        { _id },
        { new: true }
      );
      return deleted;

    }
  },
};

module.exports = resolvers;