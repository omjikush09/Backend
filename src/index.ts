import express from "express"
import * as dotenv from "dotenv"
import { PORT } from "./config/config.keys";

//Router
import authRouter from "./routes/auth.route"
import imageRouter from "./routes/image.route"
dotenv.config();
const app=express();

//regular middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/api/v1",authRouter);
app.use("/api/v1",imageRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT} 🚀`);
})


