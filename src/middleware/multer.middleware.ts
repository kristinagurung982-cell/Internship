import multer from "multer";

const  storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, "src/uploads/"),
    filename: (req, file, callback) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        callback(null, uniqueName);
    },
});

export const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
