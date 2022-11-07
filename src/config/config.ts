import dotenv from 'dotenv'
import path from 'path'

dotenv.config()
dotenv.config({ path: path.join(__dirname, '../../.env') })

export default {
    port: process.env.PORT || 3000,
    DB_URL: process.env.DB_URL!,
    jwtSecret: process.env.JWT_SECRET!,
    jwtExpiration: process.env.JWT_EXPIRATION!,
}
