import Express from 'express';

// dependencies
import 'dotenv/config';
import cookieParser from 'cookie-parser';

// middlewares
import cors from 'cors';

// routes
import usersRoutes from './routes/users.route.js';
import gamesRoutes from './routes/games.route.js';
import authRoutes from './routes/auth.route.js';

/*==============================
============  MAIN  ============
===============================*/

const app = Express();

// Allow fetch requests from frontend local dev environement
app.use(
   cors({
      origin: ['http://localhost:5000', 'https://gameverse.local'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      exposedHeaders: ['set-cookie'],
   }),
);

// To parse json
app.use(Express.json());

// To parse and manipulate cookie
app.use(cookieParser());

//***===== Routes =====***//

app.use('/api', usersRoutes); // Users ressources

app.use('/api', gamesRoutes); // Users Games ressources

app.use('/api', authRoutes); // Auth ressources

// Test
app.get('/', (req, res) => {
   res.send('Hello World!');
});

const port = process.env.PORT;

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
