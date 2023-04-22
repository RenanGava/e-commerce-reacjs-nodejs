import { prisma } from "../../../prisma"
import { stripe } from "../../../service/Stripe"

interface ICreateProducts {
    name: string
    description: string
    category_id: string
    stock: number
    price: string
    images?: string[]
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

        /**
         * desta forma criamos o produto e preço juntos
         * mas impossibilita de apagar o produto dentro do stripe quando form preciso.
         */
        const productCreateStripe = await stripe.products.create({
            name: name,
            description: description,
            default_price_data:{
                currency: "brl",
                unit_amount: Number(price)
            },
            metadata:{
                stock: stock
            }
        })
        

        const product = await prisma.products.create({
            data: {
                name: name,
                active: productCreateStripe.active,
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