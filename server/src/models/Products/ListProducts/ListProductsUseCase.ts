import { prisma } from "../../../prisma";




class ListProductsUseCase{

    async execute(){

        const products = await prisma.products.findMany()

        return products
    }
}

export { ListProductsUseCase }