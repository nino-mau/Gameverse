import Express from 'express';

// functions
import { logoutUser } from '../controllers/authController.js';
import { userLogin, userRegistration } from '../controllers/authController.js';
import {
   authentificateAccessToken,
   authentificateRefreshToken,
} from '../middlewares/middlewares.js';

const router = Express.Router();

//***===== Routes =====***//

// Handle user registration (unprotected)
router.post('/auth/register', userRegistration);

// Handle user login (unprotected)
router.post('/auth/login', userLogin);

// Handle logout
router.post('/auth/logout', authentificateAccessToken, logoutUser);

// Verify access token
router.post('/auth/access-token', authentificateAccessToken, (req, res) => {
   res.sendStatus(200);
   console.log('/auth/access-token: JWT token validity check successful (200 OK)');
});

// Handle sending refresh token
router.post('/auth/refresh-token', authentificateRefreshToken, (req, res) => {
   res.sendStatus(200);
   console.log('/auth/refresh-token: New access token sent (200 OK)');
});

export default router;
