const express=require("express")
const mysql=require("mysql")
const cors=require("cors")


const app=express()
const port =8085;

app.use(express.json())
app.use(cors())



app.listen(port, ()=>{
    console.log("Server running on",port)
})