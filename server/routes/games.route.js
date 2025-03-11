// **** IMPORTS ****
import Express from 'express';

// Functions
import { sendGamesInfo } from '../controllers/gameController.js';

// **** ROUTES ****

const router = Express.Router();

// *** Games ***

// Send games genre, names, images and review to frontend
router.get('/games', sendGamesInfo);

export default router;
