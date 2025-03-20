import Express from 'express';

// functions
import { sendGameInfos } from '../controllers/gameController.js';

const router = Express.Router(); // init

//***===== Routes =====***//

// Send games genre, names, images and review to frontend
router.get('/games', sendGameInfos);

export default router;
