import { Router } from "express";
import { StudentController } from "../controller/student.conntroller"

const router = Router();

router.post("/student", StudentController.createStundet);

export default router;