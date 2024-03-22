const express=require("express")
const userModel=require("../models/userModel")

const router = express.Router()


router.post('/signup', async (req, res) => {
    let { data } = { "data": req.body }
    userModel.insertUser(req.body, (error, results) => {
        if (error) {
            res.status(500).send('Error inserting user data' + error)
            return
        }
        res.status(201).send('User added with ID')
    })
})

router.get('/viewusers', (req, res) => {
    userModel.viewUsers((error, results) => {
        if (error) {
            res.status(500).send('Error fetching users:' + error)
            return
        }
        res.status(200).json(results);
    })
})

module.exports = router