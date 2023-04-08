import { prisma } from "../../../prisma"


interface ICreateCategoryProps {
    name: string
}


class CreateCategoryUseCase {

    async execute({ name }: ICreateCategoryProps) {

        // converte a primeira letra para maiúscula
        const nameCategory = name[0].toUpperCase() + name.substring(1)

        const categoryAlreadyExists = await prisma.category.findUnique({
            where: {
                name: nameCategory
            }
        })

        if (categoryAlreadyExists) {
            throw new Error("Category already Exists")
        }


        const category = await prisma.category.create({
            data: {
                name: nameCategory
            }
        })


        return category
    }
}

export { CreateCategoryUseCase }