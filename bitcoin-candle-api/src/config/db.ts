import { config } from 'dotenv'
import { connect } from 'mongoose'

export const connectToMongoDB = async () => {
    config()
    await connect(process.env.MONGODB_CONNECTION_URL)
}