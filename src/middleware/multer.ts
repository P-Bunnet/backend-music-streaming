import multer from 'multer'
import { GridFsStorage } from 'multer-gridfs-storage'
import crypto from 'crypto'
import config from '../config/config'
import jwt from 'jsonwebtoken'
import Payload from '../types/Payload'
const storage = new GridFsStorage({
    url: config.DB_URL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err)
                }
                const filename = file.originalname
                console.log(file)
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads',
                }
                resolve(fileInfo)
            })
        })
    },
})
const upload = multer({ storage })
export default upload
