import { prisma } from "../../../prisma";
import { compare } from 'bcryptjs'
import { GenerateTokenJWT } from "../../../provider/GenerateTokenJWT/GenerateTokenJWT";
import { GenerateRefreshToken } from "../../../provider/GenarateRefreshToken/GenerateRefreshToken";

interface IAuthUserProps {
    email: string
    password: string
}

class AuthUserUseCase {

    async execute({ email, password }: IAuthUserProps) {
        const userAlreadyExists = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        const refreshTokenAlreadyExists = await prisma.refresh_token.findUnique({
            where:{
                userId: userAlreadyExists.id
            }
        })

        if(refreshTokenAlreadyExists){
            await prisma.refresh_token.deleteMany({
                where:{
                    id: refreshTokenAlreadyExists.id
                }
            })
        }

        if (!userAlreadyExists) {
            throw new Error("User or password incorrect")
        }

        const verifyPassword = await compare(password, userAlreadyExists.password)

        if (!verifyPassword) {
            throw new Error("User or password incorrect")
        }



        const generateRefreshToken = new GenerateRefreshToken()
        const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id)

        const generateTokenJWT = new GenerateTokenJWT()
        const token = await generateTokenJWT.execute(userAlreadyExists.id)

        return { token, refreshToken }

    }
}

export { AuthUserUseCase }