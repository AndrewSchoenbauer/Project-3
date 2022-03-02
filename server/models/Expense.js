const { Schema, model } = require('mongoose');

const expenseSchema = new Schema(
    {
      expenseId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      expenseDescription: {
        type: String,
        required: true,
        maxlength: 25,
      },
      price: {
        type: Number,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      Trip: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Trip',
        },
      ],
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
    }
  );
  
  const Expense = model('Expense', expenseSchema);
  module.exports = expenseSchema;
  