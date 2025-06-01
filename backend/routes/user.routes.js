import express from 'express';
import { register,login,logout ,deleteaccount,profilefetch,edit } from '../controllers/user.controller.js';
import verify from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

router.post("/register",upload.fields([
    {
        name: "profile",
        maxCount: 1
    }]), register);
router.post("/login", login);
router.post("/logout", verify, logout);
router.post("/delete", verify, deleteaccount);
router.get("/profile",verify,profilefetch);
router.get("/edit",verify,upload.fields([
    {
        name: "profile",
        maxCount: 1
    }]),edit);

export default router;
