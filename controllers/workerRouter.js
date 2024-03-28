const express=require("express")
const workerModel=require("../models/workerModel")

const router = express.Router()


router.post('/signup', async (req, res) => {
    let { data } = { "data": req.body }
    workerModel.insertworker(req.body, (error, results) => {
        if (error) {
            res.status(500).send('Error inserting user data' + error)
            return
        }
        res.status(201).send('Worker added with ID')
    })
})


router.post('/loginworker', (req, res) => {
    const { worker_emailid, worker_password } = req.body;

    workerModel.workerLogin(worker_emailid, (error, worker) => { 
        if (error) {
            return res.json({
                status: "Error"
            });
        }
        if (!worker) {
            return res.json({
                status: "Invalid Email ID"
            });
        }
        // Compare the password retrieved from the database with the provided password
        if (worker.worker_password !== worker_password) {
            return res.json({
                status: "Invalid Password"
            });
        }
        // Successful login
        return res.json({
            status: "Success",
            workerData: worker
        });
    });
});



module.exports = router