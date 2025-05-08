const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'cdiDatabase';

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB successfully');
        return client.db(dbName);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

module.exports = { connectDB, client };