import express from "express";
import MyUserController from "../controller/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

// router.post("/",createCurrentUser);
router.post("/", jwtCheck, MyUserController.createUser);
router.put("/", jwtCheck, jwtParse, validateMyUserRequest, MyUserController.userProfileController)
router.get("/", jwtCheck, jwtParse, MyUserController.getUser);

export default router;