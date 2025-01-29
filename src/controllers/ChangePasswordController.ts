import { Request, Response } from 'express'
import { Types } from 'mongoose';

import { ChangePasswordService } from '../services/ChangePasswordService'
import { UserService } from '../services/UserService'

const service = ChangePasswordService
const userService = UserService

class ChangePasswordController {

    public async change(req: Request, res: Response) {
        try {
            const password = req.body.password
            const newPassword = req.body.newPassword
            const id = new Types.ObjectId(req.params.id)

            if (!id) {
                return res.status(400).json({ message: 'ID is required in  in ChangePasswordController' })
            }

            const data = await userService.findUserById(id, 'email')            

            if (!data) {
                return res.status(400).json({ message: 'User not found in ChangePasswordController' })
            } 

            const user = await service.changePassword(id, password, newPassword)
            return res.status(201).json({ user: user })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export default new ChangePasswordController()
