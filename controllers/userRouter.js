const express=require("express")
const userModel=require("../models/userModel")
const bcrypt = require("bcryptjs")

const router = express.Router()


hashPasswordgenerator = async (pass) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(pass, salt)
}


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

router.post('/loginuser', (req, res) => {
    const { user_email, user_pass } = req.body;

    userModel.userLogin(user_email, (error, user) => { 
        if (error) {
            return res.json({
                status: "Error"
            });
        }
        if (!user) {
            return res.json({
                status: "Invalid Email ID"
            });
        }
        // Compare the password retrieved from the database with the provided password
        if (user.user_pass !== user_pass) {
            return res.json({
                status: "Invalid Password"
            });
        }
        // Successful login
        return res.json({
            status: "Success",
            userData: user
        });
    });
});



module.exports = router