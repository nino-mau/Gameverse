/*==============================
===========  IMPORTS  ==========
===============================*/

import Express from 'express';

// functions
import { sendGameInfos } from '../controllers/gameController.js';

/*==============================
============  MAIN  ============
===============================*/

const router = Express.Router(); // init

// Send games genre, names, images and review to frontend
router.get('/games', sendGameInfos);

export default router;
