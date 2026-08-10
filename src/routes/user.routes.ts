
import {Router} from 'express';
import { UserController } from '../controller/user.controller';
import {authMiddleWare} from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validateRequestmiddleware';
import { createUserSchema } from '../Validations/user.validation';

const router = Router();

router.post('/user', UserController.createUser);
router.get('/user', UserController.getUsers);
router.get('/user/:id', UserController.getUserByID);
router.delete('/user/:id', UserController.deleteUserByID);
router.put('/user/:id', UserController.updateUser);
router.patch('/user/:id', UserController.patchUser);
router.post('/login', UserController.login);

router.post('/user',authMiddleWare,createUserSchema,validateRequest,UserController.createUser);
router.post('/login',UserController.login);

export default router;
