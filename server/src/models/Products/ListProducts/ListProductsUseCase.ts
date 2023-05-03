import { prisma } from "../../../prisma";




class ListProductsUseCase{

    async execute(){

        const products = await prisma.product.findMany()

        return products
    }
}

export { ListProductsUseCase }