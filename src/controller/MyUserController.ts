import { Request, Response } from "express";
import User from "../models/user.model";

const getUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.userId });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const createUser = async (req: Request, res: Response) => {
    try {
        const { auth0Id } = req.body;
        const existingUser = await User.findOne({ auth0Id });

        if (existingUser) {
            res.status(200).json({ message: "User already exists" });
            return;
        }

        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).json(newUser.toObject()); // Explicit return add kiya
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" }); // Error case mein bhi return karo
    }
};

//SECTION - UPDATE USER PROFILE
const userProfileController = async (req: Request, res: Response) => {
    try {
        const { name, addressLine1, country, city } = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        user.name = name;
        user.addressLine1 = addressLine1;
        user.country = country;
        user.city = city;

        await user.save();

        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in updating user" });
    }
};

export default {
    getUser,
    createUser,
    userProfileController,
};
