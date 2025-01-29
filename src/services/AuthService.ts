
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { UserModel } from '../models/UserModel';

const JWT_SECRET = process.env.JWT_SECRET as Secret;

interface User {
  _id: string;
  email: string;
  password: string;
  checkPassword(password: string): Promise<boolean>;
}

export class AuthService {  

  static async findUserByEmail(email: string): Promise<User | null> {
    try {    

      return await UserModel.findOne({ email: email }, `email password`);
      
    } catch (error) {
      throw new Error(`User not found in AuthService: ${error}`);
    }
  }

  static async validatePassword(email: string, password: string): Promise<boolean> {
    try {
      const user = await this.findUserByEmail(email);      

      if (!user) {
        throw new Error('User not found in  in AuthService');
      }

      console.log('User: ' + user.password);

      const isPasswordValid = await bcrypt.compare(password, user.password)
      return isPasswordValid;

    } catch (error) {
      throw new Error(`Validate password error in AuthService: ${error}`);
    } 
  }

  static generateToken(user: User): string {
    try {
      return jwt.sign({ id: user._id }, JWT_SECRET!, { expiresIn: '7d' });
    } catch (error) {
      throw new Error(`Token generator error: ${error}`);
    }
  }
  
}

