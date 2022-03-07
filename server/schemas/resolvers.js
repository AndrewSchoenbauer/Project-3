const { AuthenticationError } = require('apollo-server-express');
const { User, Trip } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
      // .populate('trips');
    },
    trips: async () => {
      return Trip.find();
    },
    trip: async (parent, { tripId }) => {
      const trip = await Trip.findOne({ _id: tripId }).populate("users");
      return trip;
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    addTrip: async (parent, { tripName, startDate, endDate }) => {
      const trip = await Trip.create({ tripName, startDate, endDate });
      return { trip };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addExpense: async (parent, {tripId, expenseDescription, price, quantity, expenseAuthor}) => {
      // console.log(args);
      console.log( "hello", tripId, expenseDescription, price, quantity, expenseAuthor)
      const trip = await Trip.findOneAndUpdate(
        { _id: tripId },
        {
          $addToSet: { expenses: { expenseDescription, price, quantity, expenseAuthor } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      console.log(trip);
      return trip;
    },
    addUserToTrip: async (parent, { tripId, userId }) => {
      return await Trip.findOneAndUpdate(
        { _id: tripId },
        {
          $addToSet: { users: userId },
        },
      )
    },
    removeExpense: async (parent, { tripId, expenseId }) => {
      return await Trip.findOneAndUpdate(
        { _id: tripId },
        { $pull: { expenses: { _id: expenseId } } },
        { new: true }
      );
    },
    removeUser: async (parent, { tripId, userId }) => {
      return await Trip.findOneAndUpdate(
        { _id: tripId },
        { $pull: { users: userId  } },
        { new: true }
      );
    },

  }
}


module.exports = resolvers;