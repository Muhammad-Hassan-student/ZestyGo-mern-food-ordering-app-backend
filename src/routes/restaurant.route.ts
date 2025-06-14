import express from "express";
import MyRestaurantController from "../controller/MyRestaurantController";
import upload from "../middleware/multer";
import { validateMyRestaurantRequest } from "../middleware/validation";
import { jwtCheck, jwtParse } from "../middleware/auth";

const router = express.Router();

router.post(
  "/",
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  upload.single("imageFile"),
  MyRestaurantController.createRestaurant
);
router.get("/", jwtCheck, jwtParse, MyRestaurantController.getRestaurant);
router.put(
  "/",
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  upload.single("imageFile"),
  MyRestaurantController.updateRestaurant
);

export default router;
