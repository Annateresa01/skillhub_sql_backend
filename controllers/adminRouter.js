const express=require("express")
const adminModel=require("../models/adminModel")

const router = express.Router()


router.post('/loginadmin', (req, res) => {
    const { admin_username, admin_password } = req.body;

    adminModel.adminLogin(admin_username, (error, admin) => { 
        if (error) {
            return res.json({
                status: "Error"
            });
        }
        if (!admin) {
            return res.json({
                status: "Invalid Username"
            });
        }
        // Compare the password retrieved from the database with the provided password
        if (admin.admin_password !== admin_password) {
            return res.json({
                status: "Invalid Password"
            });
        }
        // Successful login
        return res.json({
            status: "Success",
            Data: admin
        });
    });
});

router.post('/updatestatus', (req, res) => {
    const { worker_id } = req.body;

    adminModel.updateStatus(worker_id, (error, result) => { 
        if (error) {
            return res.json({
                status: "Error"
            });
        }
        if (result.affectedRows === 0) {
            return res.json({
                status: "No worker found with the provided ID"
            });
        }
        // Successful update
        return res.json({
            status: "Success"
        });
    });
});

module.exports = router