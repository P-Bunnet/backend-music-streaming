import User, { IUser, TUser } from '../../models/User'
import HttpStatusCodes from 'http-status-codes'
import gravatar from 'gravatar'
import bcrypt from 'bcryptjs'
import Payload from '../../types/Payload'
import config from '../../config/config'
import jwt from 'jsonwebtoken'
async function createUser(email: string, password: string) {
    try {
        let user: IUser = await User.findOne({ email })

        if (user) {
            return {
                status: HttpStatusCodes.BAD_REQUEST,
                message: 'User already exists',
            }
        }

        const options: gravatar.Options = {
            s: '200',
            r: 'pg',
            d: 'mm',
        }

        const avatar = gravatar.url(email, options)

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)

        // Build user object based on TUser
        const userFields: TUser = {
            email,
            password: hashed,
            avatar,
        }

        user = new User(userFields)

        await user.save()

        const payload: Payload = {
            userId: user.id,
        }
        const token = jwt.sign(payload, config.jwtSecret, {
            expiresIn: config.jwtExpiration,
        })
        return {
            status: HttpStatusCodes.OK,
            message: {
                token,
            },
        }
    } catch (err) {
        console.error(err.message)
        return {
            status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Server error',
        }
    }
}

async function getUserById(userId: string) {
    try {
        const user = await User.findById(userId)
        return {
            status: HttpStatusCodes.OK,
            message: user,
        }
    } catch (err) {
        console.error(err.message)
        return {
            status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Server error',
        }
    }
}

async function getAllUsers() {
    try {
        const users = await User.find()
        return {
            status: HttpStatusCodes.OK,
            message: users,
        }
    } catch (err) {
        console.error(err.message)
        return {
            status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Server error',
        }
    }
}

async function deleteUser(userId: string) {
    try {
        const user = await User.findById(userId)
        if (!user) {
            return {
                status: HttpStatusCodes.NOT_FOUND,
                message: 'User not found',
            }
        }
        await user.remove()
        return {
            status: HttpStatusCodes.OK,
            message: `User ${user.email} removed`,
        }
    } catch (err) {
        console.error(err.message)
        return {
            status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Server error',
        }
    }
}

async function updateAvatar(userId: string, avatar: any) {
    try {
        const user = await User.findById(userId)
        if (!user) {
            return {
                status: HttpStatusCodes.NOT_FOUND,
                message: 'User not found',
            }
        }
        user.avatar = avatar
        await user.save()
        return {
            status: HttpStatusCodes.OK,
            message: `User ${user.email} updated`,
        }
    } catch (err) {
        console.error(err.message)
        return {
            status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Server error',
        }
    }
}

export default {
    createUser,
    getUserById,
    getAllUsers,
    deleteUser,
    updateAvatar,
}
