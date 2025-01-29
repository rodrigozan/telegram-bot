import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

import { AuthService } from '../services/AuthService';

const service = AuthService

class AuthController {

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {

      const isValidPassword = await service.validatePassword(email, password);

      if (!isValidPassword) {
        return res.status(401).json({ message: 'Incorret email or password' });
      }

      const user = await service.findUserByEmail(email);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const token = service.generateToken(user);

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: `Login error: ${error.message}` });
    }
  }

  static async verifyToken(req: Request, res: Response): Promise<Response> {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);

      return res.status(200).json({ message: 'Valid token', decoded });
    } catch (error) {
      return res.status(401).json({ message: 'Token invalid or expired' });
    }
  }
}

export default new AuthController()
