import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import path from "path";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import vehicleRoute from "./routes/serviceRoute.js";
import settingRoute from "./routes/settingRoute.js";
import bookingRoute from "./routes/bookRoute.js";
import notificationRoute from "./routes/notificationRoute.js";
import serviceCenterRoute from "./routes/shopRoute.js"
const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
console.log("PORT =", process.env.PORT);
app.use(cors({
    origin: "*",
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/upload",express.static(path.join(process.cwd(),'src/upload')));
app.use("/public",express.static(path.join(process.cwd(),"src/public")));
app.use("/bootstrap-icons",express.static(path.join(process.cwd(),'node_modules/bootstrap-icons')))
app.set("view engine","ejs");
app.set('views',path.join(process.cwd(),'src/views'));

app.get('/dashboard' , (req , res)=>{
  return res.render("dashboard");
});
app.get("/privacy",(req,res)=>{
  return res.render("privacy");
});
app.get("/terms-condition",(req,res)=>{
  return res.render("terms");
});

const PORT=process.env.PORT || 4000;

app.use("/api",authRoute);
app.use("/api",categoryRoute);
app.use("/api",vehicleRoute);
app.use("/api",settingRoute);
app.use("/api",bookingRoute);
app.use("/api",notificationRoute);
app.use("/api",serviceCenterRoute);

app.listen(PORT,()=>{
    console.log(`Server Started at http://localhost:${PORT}`);
});