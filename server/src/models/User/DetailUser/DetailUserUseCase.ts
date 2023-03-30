import { prisma } from "../../../prisma";




class DetailUserUseCase{

    async execute(userId: string){

        const user = await prisma.user.findFirst({
            where:{
                id: userId
            }
        })

        if(!user){
            throw new Error("user not already exists!")
        }

        return user
    }
}

export  { DetailUserUseCase }