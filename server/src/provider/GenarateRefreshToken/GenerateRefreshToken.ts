import daysjs from 'dayjs'
import { prisma } from '../../prisma'


export class GenerateRefreshToken {

    async execute(userId: string){

        const expiresIn = daysjs().add(20, 'seconds').unix()
        

        const generateRefreshToken = await prisma.refresh_token.create({
            data:{
                userId: userId,
                expirenIn: expiresIn
            }
        })

        return generateRefreshToken
    }
}