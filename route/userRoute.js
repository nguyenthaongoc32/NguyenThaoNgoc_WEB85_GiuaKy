import express from 'express';
import { register,login} from '../controller/userController.js';
import { registerMiddleware } from '../middleware/registerMiddleware.js';
import {authorize} from '../middleware/authorize.js';
const Router = express.Router();

Router.route('/register').post(registerMiddleware,register)
Router.route('/login').post(login);
export default Router;