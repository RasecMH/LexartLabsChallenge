import mongoose from 'mongoose';
import 'dotenv/config';

const MONGO_DB_URL = 'mongodb://localhost:27017/lexartlabchallenge';

const dbConnection = (
  mongoDatabaseURI = process.env.MONGO_URI || MONGO_DB_URL
) => mongoose.connect(mongoDatabaseURI);

export default dbConnection;
