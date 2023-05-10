import { prisma } from "../../../prisma"
import { stripe } from "../../../service/Stripe"


interface ICompleteOrderProps {
    order_id: string
}

interface MapStripePaymentProducts {
    price: string,
    quantity: number
}

class CompleteOrderUseCase {

    async execute({ order_id }: ICompleteOrderProps) {
        const orderAlreadyExist = await prisma.order.findFirst({
            where: {
                id: order_id,
            },
            include: {
                product: true,
            }
        })

        if (!orderAlreadyExist) {
            throw new Error("Order Not Already Exists!")
        }

        const productsOrderBuy = orderAlreadyExist.product.map(product => {

            return {
                price_data: {
                    product: product.stripe_product_id,
                    currency: "brl",
                    unit_amount: Number(product.price),
                },
                quantity:1
            }
        })

        const { url } = await stripe.checkout.sessions.create({
            success_url: "http://localhoest:3000/success",
            line_items: productsOrderBuy,
            mode: "payment",
        })

        const completedOrder = await prisma.order.update({
            where:{
                id: order_id,
            },
            data:{
                inCart: false,
                isComplete: true,
            },
            include:{
                product: true
            }
        })

        return {
            url,
            completedOrder
        }
    }
}

export { CompleteOrderUseCase }