import express from 'express';
import Router from 'express';
import { AuthLogin } from '../controller/Auth.js';
const router = Router();

router.post('/login',AuthLogin);

export default router;