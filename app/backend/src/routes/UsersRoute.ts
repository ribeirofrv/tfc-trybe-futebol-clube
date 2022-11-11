import { Router } from 'express';
import UserService from '../services/user.services';
import UserController from '../controllers/user.controller';

const userService = new UserService();
const userController = new UserController(userService);
const userRouter = Router();

userRouter
  .post('/login', (req, res) => userController.login(req, res));

export default userRouter;
