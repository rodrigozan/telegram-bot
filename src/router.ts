import { Router } from 'express'

import UserController from './controllers/UserController'
import AuthController from './controllers/AuthController'
import ChangePasswordController from './controllers/ChangePasswordController'

import TestController from './controllers/TestController'

import { authMiddleware } from './middlewares/AuthMiddleware'

const router = Router()

const userController = UserController
const authController = AuthController
const changePassCtrl = ChangePasswordController

const testCtrl = TestController

router.post('/users', userController.create)
router.get('/users', userController.get)
router.get('/users/:id', userController.getUser) 
router.put('/users/:id', authMiddleware, userController.update)
router.delete('/users/:id', authMiddleware, userController.delete)

router.post('/auth', authController.login)

router.post('/change-password/:id', changePassCtrl.change)

router.post('/test-users', authMiddleware, testCtrl.postUsers)

export default router