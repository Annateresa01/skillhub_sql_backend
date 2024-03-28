const express=require("express")
const mysql=require("mysql")
const cors=require("cors")
const userRouter=require("./controllers/userRouter")
const workerRouter=require("./controllers/workerRouter")
const adminRouter=require("./controllers/adminRouter")


const app=express()
const port =8085;

app.use(express.json())
app.use(cors())

app.use("/api/user",userRouter)
app.use("/api/worker",workerRouter)
app.use("/api/admin",adminRouter)



app.listen(port, ()=>{
    console.log("Server running on",port)
})