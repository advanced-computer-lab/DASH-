const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userFlightSchema = new Schema(
    {
        Email: {
            type: String,
            required: true,
        },
        FlightNumber: {
            type: String,
            required: true,
        },
    });

const UserFlight = mongoose.model('User_Flight', userFlightSchema);
module.exports = UserFlight;
