import { Router } from 'express';
import UserService from '../services/user.services';
import UserController from '../controllers/user.controller';
import { IUserService } from '../interfaces/services/IUserService';

const userService = new UserService();
const userController = new UserController(userService as IUserService);
const userRouter = Router();

userRouter
  .post('/login', (req, res) => userController.login(req, res))
  .get('/login/validate', (req, res) => userController.validate(req, res));

export default userRouter;
