import { Request, Response } from 'express'

import { UserService } from '../services/UserService'

const service = UserService

class TestController {
    public async postUsers(_req: Request, res: Response) {
        try {
            const usersData = [
                { name: 'Leila Schmitt', email: 'leila.schmitt@example.net', password: 'password2' },
                { name: 'Matheus Hermann', email: 'matheus.hermann@example.net', password: 'password12' },
                { name: 'João Silva', email: 'joaosilva@email.com', password: 'password123' },
                { name: 'Maria Oliveira', email: 'mariaoliveira@email.com', password: 'password456' },
                { name: 'Pedro Santos', email: 'pedrosantos@email.com', password: 'password789' },
                { name: 'Ana Pereira', email: 'anaperreira@email.com', password: 'password123' },
                { name: 'Carlos Gomes', email: 'carlosgomes@email.com', password: 'password456' },
                { name: 'Luiza Almeida', email: 'luizaalmeida@email.com', password: 'password789' },
                { name: 'Rafael Costa', email: 'rafaelcosta@email.com', password: 'secret123' },
                { name: 'Beatriz Rodrigues', email: 'beatrizrodrigues@email.com', password: 'secret456' },
                { name: 'Gustavo Santos', email: 'gustavosantos@email.com', password: 'secret789' },
                { name: 'Fernanda Lima', email: 'fernandalima@email.com', password: 'password1234' }
            ]

            const createPromises = usersData.map(user => service.create(user))

            const createdUsers = await Promise.all(createPromises)

            return res.status(200).json(createdUsers)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: 'Error fetching users' })
        }
    }
}

export default new TestController()