import express, { Express } from 'express';
import bodyParser from 'body-parser'; 
import initDb from './database'; 
import userRoutes from './routes/userRoutes'; 
import regiaoRoutes from './routes/regiaoRoutes'; 

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swaggerConfig';

import { morganMiddleware } from './logger';

const app: Express = express();
const PORT = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use(morganMiddleware);

initDb.then(() => {
  console.log('Connected to the database successfully');
}).catch((error) => {
  console.error('Database connection failed', error);
  process.exit();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/user', userRoutes); 
app.use('/regioes', regiaoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
