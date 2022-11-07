import config from './config'
import mongoose from 'mongoose'
import { GridFSBucket } from 'mongodb'
let bucket: GridFSBucket
const connectDB = async () => {
    try {
        const mongoURI: string = config.DB_URL
        const db = await mongoose.connect(mongoURI)
        bucket = new mongoose.mongo.GridFSBucket(db.connection.db, {
            bucketName: 'uploads',
        })
        console.log('MongoDB Connected...')
    } catch (err: any) {
        console.error(err.message)
        // Exit process with failure
        process.exit(1)
    }
}
export const getBucket = () => bucket
export default connectDB
