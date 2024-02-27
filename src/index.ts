import express, { Express } from 'express';
import bodyParser from 'body-parser'; 
import initDb from './database'; 
import userRoutes from './routes/userRoutes'; 

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

initDb.then(() => {
  console.log('Connected to the database successfully');
}).catch((error) => {
  console.error('Database connection failed', error);
  process.exit();
});

app.use('/user', userRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
