import express from "express";
import { initializeDatabase } from "../configs/data-source";
import userRoutes from "../routes/user.routes";
import studentRoutes from "../routes/student.routes";
import { upload} from "../middleware/multer.middleware";
import uploadRoute from "../routes/upload.routes";
import otpRouter from "../configs/OTP";

const app = express();

app.use(express.json());

const baseRoute = "/api/v1";
const port = 5000;

app.use(baseRoute, userRoutes);
app.use(baseRoute, studentRoutes);
app.use(baseRoute,uploadRoute);
app.use(baseRoute, otpRouter);

initializeDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });