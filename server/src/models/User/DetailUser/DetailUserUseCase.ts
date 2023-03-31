import { prisma } from "../../../prisma";




class DetailUserUseCase{

    async execute(userId: string){

        const user = await prisma.user.findFirst({
            where:{
                id: userId
            },
            select:{
                avatar: true,
                email: true,
                id: true,
                name: true,
                order: true,
                stripe_customer_id: true,
                password: false
            }
        })

        if(!user){
            throw new Error("user not already exists!")
        }

        return user
    }
}

export  { DetailUserUseCase }