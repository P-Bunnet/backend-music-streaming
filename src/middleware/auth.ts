import config from '../config/config'
import { Response, NextFunction } from 'express'
import HttpStatusCodes from 'http-status-codes'
import jwt from 'jsonwebtoken'

import Payload from '../types/Payload'
import Request from '../types/Request'

export default function (req: Request, res: Response, next: NextFunction) {
    // Get token from header
    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'No token provided' })
    }
    // split bearer token into two parts
    const [, token] = req.headers.authorization.split(' ')

    // Check if no token
    if (!token) {
        return res
            .status(HttpStatusCodes.UNAUTHORIZED)
            .json({ msg: 'No token, authorization denied' })
    }
    // Verify token
    try {
        console.log(token, config.jwtSecret)
        const payload: Payload | any = jwt.verify(token, config.jwtSecret)
        req.userId = payload.userId
        next()
    } catch (err) {
        console.log(err)
        res.status(HttpStatusCodes.UNAUTHORIZED).json({
            msg: 'Token is not valid',
        })
    }
}
