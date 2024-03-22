const express=require("express")
const mysql=require("mysql")
const cors=require("cors")
const userRouter=require("./controllers/userRouter")


const app=express()
const port =8085;

app.use(express.json())
app.use(cors())

app.use("/api/user",userRouter)



app.listen(port, ()=>{
    console.log("Server running on",port)
})