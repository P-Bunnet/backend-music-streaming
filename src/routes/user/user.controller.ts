import { validationResult } from 'express-validator'
import { Response } from 'express'
import HttpStatusCodes from 'http-status-codes'
import Request from '../../types/Request'
import userServices from '../user/user.service'
async function createUser(req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() })
    }
    try {
        const { email, password } = req.body
        const user = await userServices.createUser(email, password)
        console.log(user)
        return res.status(user.status).json({ msg: user.message })
    } catch (err) {
        console.error(err.message)
        return res
            .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
            .send('Server error')
    }
}

async function getUserById(req: Request, res: Response) {
    try {
        const user = await userServices.getUserById(req.params.id)
        return res.status(user.status).json({ msg: user.message })
    } catch (err) {
        console.error(err.message)
        return res
            .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
            .send('Server error')
    }
}

async function deleteUser(req: Request, res: Response) {
    try {
        const user = await userServices.deleteUser(req.params.id)
        return res.status(user.status).json({ msg: user.message })
    } catch (err) {
        console.error(err.message)
        return res
            .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
            .send('Server error')
    }
}

async function updateAvatar(req: Request, res: Response) {
    try {
        const user = await userServices.updateAvatar(
            req.params.id,
            req.body.avatar
        )
        return res.status(user.status).json({ msg: user.message })
    } catch (err) {
        console.error(err.message)
        return res
            .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
            .send('Server error')
    }
}

async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await userServices.getAllUsers()
        return res.status(users.status).json({ msg: users.message })
    } catch (err) {
        console.error(err.message)
        return res
            .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
            .send('Server error')
    }
}

async function getUserByAccessToken(req: Request, res: Response){
    try{
        const user = await userServices.getUserByAccessToken(req.headers.authorization)
        return res.status(user.status).json({ msg: user.message })
    }
    catch(err: any){
        console.log(err.message)
        return res 
            .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
            .send('Server error')
    }
}

export default {
    createUser,
    getUserById,
    deleteUser,
    updateAvatar,
    getAllUsers,
    getUserByAccessToken
}
