import express from 'express';
import config from 'config';
import dbConnect from './utils/db.connect';
import logger from './utils/logger';
import routes from './routes';
import deserializeUser from './middleware/deserializaUser';

const port = config.get<number>('port');

const app = express();

app.use(express.json());
app.use(deserializeUser);

app.listen(port, async () => {
    logger.info(`Server is running at http://localhost:${port}`);
    await dbConnect();
    routes(app);
})