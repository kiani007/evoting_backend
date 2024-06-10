import express from 'express';
import routers from './src/routers/index.js';
import cors from 'cors';
import dotenv from 'dotenv';
import setupSwagger from './swaggerConfig.js';

const app = express();
const port = 3000; 

dotenv.config();

// allow all routes for cors
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Setup Swagger
setupSwagger(app);

app.use(routers);

app.all('*', (req, res) => {
   return res.status(404).json('Not Found');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
