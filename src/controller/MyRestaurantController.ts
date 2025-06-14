import { Request, Response } from "express";
import Restaurant from "../models/restaurant.model";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const createRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      res.status(409).json({ message: "Restaurant is already exist" });
      return;
    }

   const imageUrl = await uploadImage(req.file as Express.Multer.File);

    const restuarant = new Restaurant(req.body);
    restuarant.imageUrl = imageUrl;
    restuarant.user = new mongoose.Types.ObjectId(req.userId);
    restuarant.lastUpdated = new Date();
    await restuarant.save();

    res.status(201).json(restuarant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      res.status(409).json({ message: "Restaurant not found" });
      return;
    }

    res.json(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


const updateRestaurant = async (req: Request, res: Response) => {
try {
  const restaurant = await Restaurant.findOne({user: req.userId});
  if(!restaurant){
    res.status(409).json({message: "Restaurant not found"});
    return;
  }

  restaurant.restaurantName = req.body.restaurantName;
  restaurant.city = req.body.city;
  restaurant.country = req.body.country;
  restaurant.deliveryPrice = req.body.deliveryPrice;
  restaurant.cuisines = req.body.cuisines;
  restaurant.menuItems = req.body.menuItems;
  restaurant.lastUpdated = new Date();

  if(req.file){
    const imageUrl = await uploadImage(req.file as Express.Multer.File);
    restaurant.imageUrl = imageUrl;
  }

  await restaurant.save();

  res.status(200).send(restaurant);

} catch (error) {
  console.log(error);
  res.status(500).json({message: "Something went wrong"});
}
}

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
   //image in binary convert into string of base64
    const base64Image = Buffer.from(image.buffer).toString("base64");
    //data uri design
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    //upload image on cloudinary
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI, {
      folder: "zestygo/images",
      resource_type: "image",
    })
    return uploadResponse.secure_url;

}
export default {
  createRestaurant,
  getRestaurant,
  updateRestaurant
};
