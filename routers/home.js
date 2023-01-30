import express from "express"

const homeRouter = express.Router()


homeRouter.get('/' , (req , res) => {
    res.render('main.html')
})

export default homeRouter