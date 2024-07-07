import express from 'express';
import routers from './src/routers/index.js';
import cors from 'cors';
import dotenv from 'dotenv';
import setupSwagger from './swaggerConfig.js';
import { fileURLToPath } from 'url';
import path from 'path';
import multer from 'multer';
import admin from 'firebase-admin';



// Initialize express app
const app = express();
const port = 3000;
const  serviceAccount = './e-voting-c0337-firebase-adminsdk-fy3ag-f08f23e7d8.json';

dotenv.config();

// For ES6 module resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://e-voting-c0337-default-rtdb.firebaseio.com"
})
// Multer configuration for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// allow all routes for cors
const corsOptions = {
  origin: 'http://localhost:4000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Setup Swagger
setupSwagger(app);

// Example of using multer in a route
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'File is missing..' });
  }

  const filePath = `/uploads/${req.file.originalname}`;
  fs.writeFileSync(`./public${filePath}`, req.file.buffer);

  return res.status(201).json({ message: 'File uploaded successfully', filePath });
});

app.use(routers);

app.all('*', (req, res) => {
   return res.status(404).json('Not Found');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
