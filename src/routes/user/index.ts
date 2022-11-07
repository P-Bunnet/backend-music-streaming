import bcrypt from 'bcryptjs'
import { Router, Response } from 'express'
import { check, validationResult } from 'express-validator'
import userController from './user.controller'
import auth from '../../middleware/auth'
const router: Router = Router()

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.post(
    '/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 6 }),
    ],
    userController.createUser
)
router.get('/profile/', userController.getUserByAccessToken)
router.get('/:id', userController.getUserById)
router.delete('/:id', auth, userController.deleteUser)
router.put('/avatar/:id', auth, userController.updateAvatar)
router.get('/', userController.getAllUsers)



export default router
