import dotenv from "dotenv";
import connectDB from "./db/index.js";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config({ path: "./env" });

// Databasr connection
connectDB();

import paitentRoutes from "./routs/patientRoutes.js"
import doctorRoutes from "./routs/doctorRoutes.js"
import appointmentRoutes from "./routs/appointmentRoutes.js";
import cookieParser from 'cookie-parser';
import express from 'express';
const app = express();

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

//Use routes
app.use(
    cors({
        credentials: true,
        origin: `http://localhost:${process.env.FRONTEND_PORT}`,
    })
);
app.use("/patient", paitentRoutes);
app.use("/doctor", doctorRoutes);
app.use("/appointment",appointmentRoutes);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
