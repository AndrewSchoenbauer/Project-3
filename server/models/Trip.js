const { Schema, model } = require('mongoose');

// Schema to create a course model
const tripSchema = new Schema(
    {
        tripName: {
            type: String,
            required: true,
        },
        startDate: {
            type: String,
            default: Date.now(),
        },
        endDate: {
            type: String,
            // Sets a default value of 12 weeks from now
            default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
        },
        tripCreator: {
            type: String,
            required: true,
            trim: true,
        },
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],

        expenses: [
            {
               expenseDescription: {
                   type: String, 
                   required: true,
                   minlength: 1,
                   maxlength: 100,
               },
               price: {
                   type: Number,
                   required: true,
               },
               quantity: {
                   type: Number,
                   default: 1,
               },
               expenseAuthor: {
                   type: String,
                   required: true,
               }
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
// tripSchema.path('expenses').schema.virtual('totalExpense').get(function() {
//     return 'foo'
//   })
tripSchema
.virtual('totalExpense')
.get(function () {
  return this.expenses.reduce(function(currentValue, previousValue){
      console.log(currentValue)
     return (currentValue.price + previousValue.price);
  });
})
// return this.expenses.map(expense =>{
//     return expense.price
// })
// });
const Trip = model('Trip', tripSchema);

module.exports = Trip;
