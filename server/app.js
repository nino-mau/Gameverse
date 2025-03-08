// **** IMPORTS ****
import Express from 'express';

// Import dependencies
import 'dotenv/config';

// Import middlewares
import cors from 'cors';

// Import routes
import authRoutes from './routes/users.route.js';

// **** LOGIC ****

// *** Express Setup ***

const app = Express();
// const port = process.env.PORT;
const port = process.env.PORT;
// Allow express to parse json notably receiving data from post requests
app.use(Express.json());
// Allow fetch requests from frontend local dev environement
app.use(
   cors({
      origin: 'http://localhost:5173', // Or your allowed origin
   }),
);

// *** Routes setup ***

// Use the register endpoint route
app.use('/api', authRoutes);

app.get('/', (req, res) => {
   res.send('Hello World!');
});

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
