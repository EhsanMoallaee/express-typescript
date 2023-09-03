import mongoose from 'mongoose';
import config from 'config';
import logger from './logger';

async function dbConnect() {
    const dbUri = config.get<string>('dbUri');
    try {
        await mongoose.connect(dbUri);
        logger.info('Connected to MongoDB successfully');
    } catch (err) {
        logger.error('MongoDB connection error: ', err);
        process.exit(1);
    }
}

export default dbConnect;