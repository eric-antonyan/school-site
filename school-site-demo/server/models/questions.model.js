const mongoose = require("mongoose")

const questionsSchema = mongoose.Schema({
    uuid: String,
    trueAnswers: mongoose.Schema.Types.Mixed,
    falseAnswers: mongoose.Schema.Types.Mixed,
    unansweredQuestions: mongoose.Schema.Types.Mixed,
    trueCount: Number,
    falseCount: Number,
    unansweredCount: Number,
    getedUserId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }
})

module.exports = mongoose.model("Questions", questionsSchema)