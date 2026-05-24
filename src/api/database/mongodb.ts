import mongoose from 'mongoose';
import config from '../config';

mongoose.set('strictQuery', true);

mongoose.connect(config.db.mongodbUri || '')
    .then(() => console.log('Connected to MongoDB!'))
    .catch((err) => console.log('Error connecting to MongoDB', err));

export default mongoose;