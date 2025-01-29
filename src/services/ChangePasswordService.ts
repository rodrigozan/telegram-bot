import bcrypt from 'bcryptjs';
import { Types } from 'mongoose';

import { UserModel } from '../models/UserModel';

export class ChangePasswordService {

    static async changePassword(id: Types.ObjectId, password: string, newPassword: string) { 
        try {

            const user = await UserModel.findOne({ _id: id }, 'email')      
            console.log('user:' + user, password) 
            
            if (!user) {
                throw new Error('User not found in ChangePasswordService');
            }    

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            user.password = hashedPassword;
            await user.save();

            return { message: 'Password updated successfully' };

        } catch (error) {
            console.error('Error in service: ', error.message);
            throw error; 
        }
    }

}