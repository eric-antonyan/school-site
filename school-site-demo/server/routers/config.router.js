require("dotenv").config()

const port = process.env.PORT
const db = process.env.DB

module.exports = { port, db }