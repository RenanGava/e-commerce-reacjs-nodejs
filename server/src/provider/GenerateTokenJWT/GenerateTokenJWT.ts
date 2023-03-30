import { sign } from 'jsonwebtoken'


class GenerateTokenJWT{

    async execute(userId:string){
        
        const token = sign({}, process.env.JWT_SECRET_KEY, {
            subject: userId,
            expiresIn: '20s'
        })

        return token
    }
}

export { GenerateTokenJWT }