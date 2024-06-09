import express from 'express';
import routers from './src/routers/index.js';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
const port = 3002; 
dotenv.config();
// allow all routes for cors
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use(routers);

app.all('*', (req, res) => {
   return res.status(404).json('Not Found');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
}) 