import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router
  .route("/")
  .get(userController.getAllUser)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.route("/get-user-info").post(userController.getUserWithEmail);

export default router;
