import dayjs from "dayjs";
import { prisma } from "../../../prisma";
import { GenerateRefreshToken } from "../../../provider/GenarateRefreshToken/GenerateRefreshToken";
import { GenerateTokenJWT } from "../../../provider/GenerateTokenJWT/GenerateTokenJWT";




class RefreshTokenUseCase {

    async exeucte(refresh_token_id: string) {
        const refreshToken = await prisma.refresh_token.findUnique({
            where: {
                id: refresh_token_id
            }
        })

        if (!refreshToken) {
            throw new Error("refresh-token invalid!")
        }

        const refreshToken_expired = dayjs().isAfter(dayjs.unix(refreshToken.expirenIn))

        const generateTokenJWT = new GenerateTokenJWT()
        const token = await generateTokenJWT.execute(refreshToken.userId)

        if (refreshToken_expired) {
            await prisma.refresh_token.deleteMany({
                where: {
                    id: refreshToken.id
                }
            })

            const generateRefreshToken = new GenerateRefreshToken()
            const newRefreshToken = await generateRefreshToken.execute(refreshToken.userId)

            return { token, refreshToken:newRefreshToken  }

        }

        return { token }
    }
}

export { RefreshTokenUseCase }