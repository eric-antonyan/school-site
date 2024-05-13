const { Router } = require("express")
const router = Router()

router.post('/', (req, res) => {
    const {email, password} = req.body
    if (email === "lernahovit@yandex.ru" && password === "Math2024II") {
        res.send({message: "Դուք մուտք գործեցիք!", success: 1})
    } else {
        res.send({message: "Այդպիսի հաշիվ գոյություն չունի!", success: 0})
    }
})

module.exports = router