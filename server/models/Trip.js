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
        User: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],

        Expense: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Expense'
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

const Trip = model('Trip', tripSchema);

module.exports = Trip;
