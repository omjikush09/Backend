import { NextFunction, Request,Response } from "express";
import upload from "../config/s3ImageUpload";
import prisma from "../utils/prisma";

const singleUpload=upload.single("image")

export const imageUpload=async (req:Request,res:Response,next:NextFunction)=>{
        singleUpload(req,res,async(err)=>{
            if(err){
                return res.status(422).json({error: err})
            }
            try {
                const image=await prisma.image.create({
                    data:{
                        //@ts-ignore
                        url:req.file?.location
                    }
                })
                return res.json({
                    status:200,
                    message:"Success",
                    img_id:image.id
                })
            } catch (error) {
                return res.status(502).json({error: err})
            }
           
            
        })     
}

export const getImage=async(req:Request,res:Response)=>{

    const {imageId}=req.params
    try {
        const image=await prisma.image.findUnique({
            where:{
                id:imageId
            }
        })
  
        if(image) return res.redirect(image?.url)

        return res.status(502).json({error:"Wrong image id"})
        
    } catch (error) {
        return res.status(502).json({error})
    }
}