import {Router} from 'express';
import { checkAuth, login, logout, signup, updateProfile } from '../controllers/auth.controller';
import { protectRoute } from '../middleware/auth.middleware';
const router = Router();

router.route('/login').post(login);
router.route('/signup').post(signup);
router.route('/logout').post(logout);

router.put('/update-profile',protectRoute,updateProfile);

router.get('/check',protectRoute,checkAuth);

export default router;