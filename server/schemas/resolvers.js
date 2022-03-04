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
      const trip= await Trip.findOne({ _id: tripId });
      console.log(trip);
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
    addTrip: async (parent, { tripName, startDate, endDate}) => {
      const trip = await Trip.create({ tripName, startDate, endDate });
      return {trip};
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
    addExpense: async (parent, { tripId, expenseDescription, price, quantity, expenseAuthor }) => {
      return Trip.findOneAndUpdate(
        { _id: tripId },
        {
          $addToSet: { expenses: { expenseDescription, price, quantity, expenseAuthor } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
  
  
  
  
  }}


    module.exports = resolvers;