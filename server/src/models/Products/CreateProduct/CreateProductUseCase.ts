import { prisma } from "../../../prisma"
import { stripe } from "../../../service/Stripe"

interface ICreateProducts {
    name: string
    description: string
    category_id: string
    stock: number
    price: number
}

interface PayloadCreateStripeProduct{
    id: string
}

class CreateProductsUseCase {

    async execute({
        category_id,
        description,
        name,
        price,
        stock
    }:ICreateProducts) {
        const productAlreadyExist = await prisma.products.findFirst({
            where:{
                name: name
            }
        })

        if(productAlreadyExist){
           throw new Error("Product Already exists!") 
        }

        const productCreateStripe = await stripe.products.create({
            name: name,
            metadata:{
                description: description,
                price: price,
                stock: stock
            }
        })

        await stripe.prices.create({
            product: productCreateStripe.id,
            unit_amount: 1000,
            currency: 'brl',
        })
        

        const product = await prisma.products.create({
            data: {
                name: name,
                amount: 0,
                description: description,
                price: price,
                stock: stock,
                stripe_product_id: productCreateStripe.id,
                category_id: category_id,
            }
        })

        return product

    }
}

export { CreateProductsUseCase }