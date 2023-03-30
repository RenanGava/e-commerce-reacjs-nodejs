import daysjs from 'dayjs'
import { prisma } from '../../prisma'


export class GenerateRefreshToken {

    async execute(userId: string){

        const expiresIn = daysjs().add(20, 'seconds').unix()

        console.log(expiresIn);
        

        const generateRefreshToken = await prisma.refresh_token.create({
            data:{
                userId: userId,
                expirenIn: expiresIn
            }
        })

        return generateRefreshToken
    }
}