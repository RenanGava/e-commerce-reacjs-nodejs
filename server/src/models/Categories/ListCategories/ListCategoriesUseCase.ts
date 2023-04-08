import { prisma } from "../../../prisma";


class ListCategoriesUseCase {

    async execute() {

        const categories = await prisma.category.findMany()

        return categories
    }
}

export { ListCategoriesUseCase }