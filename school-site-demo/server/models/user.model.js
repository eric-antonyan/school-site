const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    uuid: String,
    firstName: String,
    lastName: String,
    fathername: String,
    email: String,
    studentSchool: String,
    studentClass: Number
})

module.exports = mongoose.model("User", userSchema)