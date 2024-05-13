const express = require("express")
const mongoose = require("mongoose")
const User = require("./models/user.model")
const Questions = require("./models/questions.model")
require("dotenv").config()
const { port, db } = require("./routers/config.router")

const nodemailer = require("nodemailer")

const cors = require("cors")

const app = express()

mongoose.connect(db)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const adm = require("./routers/admin.router")

app.post("/students", async (req, res) => {
    const { firstName, lastName, uuid, studentClass, studentSchool, email, fathername } = req.body;
    const user = await User.create({ firstName, lastName, uuid, studentClass, studentSchool, email, fathername })
    console.log(user);
})

app.get("/users", async (req, res) => {
    const userData = await User.find();
    console.log(userData);
    res.json(userData)
})

app.post("/opt", async (req, res) => {
    const { email, verifyCode, firstName } = req.body;
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "antonyancoding@gmail.com",
            pass: "xhrqpbilfmjtszir"
        }
    })

    const info = await transporter.sendMail({
        from: '"Սարգիս Կարապետյանի միջնակարգ դպրոց" <antonyancoding@gmail.com>', // sender address
        to: email,
        subject: "Verification Code ✔",
        html: `<center><h1>Բարի գալուստ ${firstName}</h1></center>
        <br>
        <center><h3 style="line-height:27px">Ողջույն <span style="color:#fff;background:#ffb700;padding:3px 10px;font-size:14px;border-radius:4px">${firstName}</span>
        Ձեր վերֆիկացման կոդը՝ ${verifyCode}</h3>`,
    });

    console.log("Message sent: %s", info.messageId);
})

app.use('/adm', adm)

app.get('/students', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/questions', async (req, res) => {
    try {
        const result = await Questions.find({});

        if (result.length === 0) {
            return res.status(404).json({ error: 'No questions found' });
        }

        res.send(result);
    } catch (err) {
        console.error('Error fetching questions with user info:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/students/get/:uuid', async (req, res) => {
    const user = await User.findOne({ uuid: req.params.uuid })
    if (user) {
        res.send(user)
    } else {
        res.send([])
    }
    console.log(user);
})

app.get('/students', async (req, res) => {
    const users = await User.find({});
    res.json(users)
})

app.delete('/rf/_:id', async (req, res) => {
    const user = await User.deleteOne({ _id: req.params.id })
    res.send(user)
})

app.post('/questions', async (req, res) => {
    const { uuid, trueAnswers, falseAnswers, unansweredQuestions, trueCount, falseCount, unansweredCount } = req.body;
    const quest = await Questions.create({ uuid, trueAnswers, falseAnswers, unansweredQuestions, trueCount, falseCount, unansweredCount })
    console.log(quest);
})

app.get('/questions/:uuid', async (req, res) => {
    const { uuid } = req.params;
    const questions = await Questions.findOne({ uuid })
    questions ? res.send(questions) : res.send({ message: "not found", found: 0, success: 0 })
})

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => console.log("Server is running!"))