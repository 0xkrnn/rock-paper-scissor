const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: true
    },
    matchPlayed: {
        type: Number,
        default: () => 0
    },
    won: {
        type: Number,
        default: () => 0
    },
    lose: {
        type: Number,
        default: () => 0
    },
    winPercentage : {
        type: Number,
        default: () => 0
    }

}, {
    collection: "players"
});


module.exports = mongoose.model("players", userSchema)