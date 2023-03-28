import { prisma } from "../../prisma";
import { hash } from 'bcryptjs'

interface ICreateUserProps{
    name: string
    email: string
    password: string
    avatar: string
}


class CreateUserUseCase{

    async execute({ name, email, password, avatar }:ICreateUserProps){
        
        const userAlreadyExists = await prisma.user.findFirst({
            where:{
                email: email
            }
        })

        console.log(userAlreadyExists);
        

        if(userAlreadyExists){
            throw new Error("User already exists")
        }

        const stripe_customer_id = ''

        const passwordHash = await hash(password, 8)

        const user = await prisma.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash,
                avatar: avatar,
                stripe_customer_id

            }
        })


        return user

    }
}

export {CreateUserUseCase}