import { Router } from "express";
import upload from "../config/s3ImageUpload";
import { imageUpload,getImage } from "../controllers/image.controller";

const router = Router();

router.post("/upload",imageUpload)

router.get("/:imageId",getImage)



export default router;