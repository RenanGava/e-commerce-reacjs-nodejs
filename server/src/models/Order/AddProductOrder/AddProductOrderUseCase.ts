import { prisma } from "../../../prisma"

interface IAddProductOrderProps {
    product_id: string
    userId: string
}

class AddProductOrderUseCase {

    async execute({ product_id, userId }: IAddProductOrderProps) {

        const [orderAlreadyExists, productFind] = await Promise.all([
            prisma.order.findFirst({
                where: {
                    userId: userId,
                    inCart: true
                }
            }),
            prisma.product.findFirst({
                where: {
                    id: product_id,
                }
            })
        ])

        if (orderAlreadyExists === null) {

            const createOrder = await prisma.order.create({
                data: {
                    userId: userId,
                    inCart: true,
                    isComplete: false,
                }
            })

            await prisma.product.update({
                where: {
                    id: product_id
                },
                data: {
                    order_id: createOrder.id
                }
            })

        } else {

            const productUpdateOrder = await prisma.product.update({
                where: {
                    id: productFind.id
                },
                data: {
                    order_id: orderAlreadyExists.id,
                }
            })

        }

        const order = await prisma.order.findFirst({
            where: {
                userId: userId,
                inCart: true
            },
            include:{
                product: true
            }
        })

        return order
    }
}

export { AddProductOrderUseCase }