// **** IMPORTS ****
import Express from 'express';

// Functions
import { userRegistration } from '../controllers/authController.js';
import { userLogin } from '../controllers/authController.js';
import { userInfo } from '../controllers/usersController.js';
import { authentificateToken } from '../middlewares/middlewares.js';

// **** ROUTES ****

const router = Express.Router();

// Define endpoint for receiving register form data
router.post('/users/register', userRegistration);

// Define endpoint for receiving register form data
router.post('/users/login', userLogin);

// Define endpoint for receiving register form data
router.get('/users/me', authentificateToken, userInfo);

// Define endpoint for client to verify JWT token validity
router.post('/users/token-auth', authentificateToken, (req, res) => {
   res.sendStatus(200);
   console.log('JWT token validity check successful (200 OK)');
});

export default router;
