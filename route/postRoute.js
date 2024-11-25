import express from 'express';
import { postCreate,postPut} from '../controller/postController.js';
import {authorize} from '../middleware/authorize.js';
const Router = express.Router();

Router.route('/').post(authorize, postCreate)
Router.route('/:id').put(authorize,postPut);
export default Router;