import express from 'express';
import { signupValidation, loginValidation } from '../validation/auth.validation.js';
import { signup, login } from '../controllers/auth.controller.js';
import { getPosts } from '../controllers/posts.controller.js';

export const authRouter = express.Router();

authRouter.post('/signup', signupValidation, signup);
authRouter.post('/login', loginValidation, login);

export const postsRouter = express.Router();

postsRouter.get('/posts', getPosts);
