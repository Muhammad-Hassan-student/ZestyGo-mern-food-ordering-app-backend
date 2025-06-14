import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config"
import { connectDb } from "./config/connectDb";
import myUserRoute from "./routes/user.route"
import myRestaurantRoute from "./routes/restaurant.route"

import connectCloudinary from "./config/cloudinary";

connectDb();
connectCloudinary();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);

app.get('/health', (req: Request, res: Response) => {
    res.json({ message: "Health Ok♥!" });
});

app.listen(7000, () => {
    console.log(`Server started on localhost:7000`);
})