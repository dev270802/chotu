const express=require("express");
const db=require('./db/db')
const app=express();
const cors=require('cors');
const userRoute=require('./routers/usersRoutes')
const shortUrlRoute=require('./routers/shortUrlRoutes')
const redirectRoute=require('./routers/redirectUrl')

const port=process.env.PORT||3000

app.use(cors())
app.use(express.json());
app.get("/",(req,res)=>{
    console.log("Hii")
    res.send("<h1>HII USER</h1>")
})
app.use("/api/v1/redirect",redirectRoute)
app.use("/api/v1/users",userRoute)
app.use("/api/v1/shortUrl",shortUrlRoute)


db().then(app.listen(port,()=>{
    console.log("Server is running")
    console.log(port)
}))