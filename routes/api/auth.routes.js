import Router from 'express';
import { AuthLogin, AuthLogout } from '../../controller/Auth.js';
import isAuth from '../../middleware/auth.js';

const router = Router();

router.post('/login', AuthLogin);
router.post('/logout', isAuth, AuthLogout);

export default router;