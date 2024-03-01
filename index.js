import { config } from 'dotenv'
import { MongoClient } from 'mongodb'

config()

export async function connectToCluster(uri) {
    let mongoClient
 
    try {
        mongoClient = new MongoClient(uri)
        await mongoClient.connect()
 
        return mongoClient
    } catch (error) {
        process.exit()
    }
}

export async function findDataByName(collection, name) {
    return collection.find({}, {'username': name}).toArray();
}

export async function executeOperations() {
    const uri = process.env.DB_URI;
    let mongoClient;
 
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('accounting');
        const collection = db.collection('accountData');
        console.log(await findDataByName(collection, 'username'))
    } finally {
        await mongoClient.close();
    }
}

await executeOperations()