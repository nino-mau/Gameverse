// **** IMPORTS ****
import Express from 'express';

// Functions
import { userRegistration } from '../controllers/authController.js';
import { userLogin } from '../controllers/authController.js';
import { userInfo } from '../controllers/usersController.js';
import { authentificateAccessToken } from '../middlewares/middlewares.js';
import { authentificateRefreshToken } from '../middlewares/middlewares.js';

// **** ROUTES ****

const router = Express.Router();

// Define endpoint for receiving register form data
router.post('/users/register', userRegistration);

// Define endpoint for receiving register form data
router.post('/users/login', userLogin);

// Define endpoint for receiving register form data
router.get('/users/me', authentificateAccessToken, userInfo);

// Define endpoint for client to verify JWT token validity
router.post('/users/access-token', authentificateAccessToken, (req, res) => {
   res.sendStatus(200);
   console.log('/users/access-token: JWT token validity check successful (200 OK)');
});

// Define endpoint for client to get a new access token with refresh token
router.post('/users/refresh-token', authentificateRefreshToken, (req, res) => {
   res.sendStatus(200);
   console.log('/users/refresh-token: New access token sent (200 OK)');
});

export default router;
