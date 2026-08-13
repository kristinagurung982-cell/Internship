import { Router } from "express";
import { upload } from "../middleware/multer.middleware";
const router = Router();

router.post('/upload-single',upload.single("image"),(req,res)=>{
    if(!req.file) return res.status(400).json({message:"File is required."});
    res.status(200).json({message:"File saved successfully.",fileName:req.file.filename});
});

//Multiple different fields
router.post(
    "/upload-product",
    upload.fields([
        {name: "thumbnail", maxCount: 1},
        {name: "gallery", maxCount: 5},
    ]),
    (req, res) => {
        const files = req.files as {[field: string]: Express.Multer.File[]};
        res.json({thumbnail: files.thumbnail?.[0]?.filename,gallery:
            files.gallery?.map((f) => files.filename)});
    }
);



export default router;
