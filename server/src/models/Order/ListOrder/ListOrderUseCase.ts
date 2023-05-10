import { prisma } from "../../../prisma";


class ListOrderUseCase{

    async execute(){

        const orders = await prisma.order.findMany()
        return orders
    }
}

export { ListOrderUseCase }