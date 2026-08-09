
import {Router} from 'express'
import { UserController } from '../controller/user.controller'

const router = Router();

router.post('/user', UserController.createUser)
router.get('/user', UserController.getUsers)
router.get('/user/:id', UserController.getUserByID)
router.delete('/user/:id', UserController.deleteUserByID)
router.put('/user/:id', UserController.updateUser)
router.patch('/user/:id', UserController.patchUser)
router.post('/login', UserController.login)

export default router;
