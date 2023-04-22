import { prisma } from "../../../prisma"
import { stripe } from "../../../service/Stripe"


interface IUpdateProductProps {
    id?: string
    name?: string
    description?: string
    amount?: number
    stock?: number
    price?: string
    category?: string
}



class UpdateProductUseCase {

    async execute({
        id,
        amount,
        category,
        description,
        name,
        price,
        stock
    }: IUpdateProductProps) {

        const productAlreadyExists = await prisma.products.findFirst({
            where: { 
                id: id 
            }
        })

        if(!productAlreadyExists){
            throw new Error('Product Not Already Exists!')
        }

        const updateProduct = await prisma.products.update({
            where: {
                id: id
            },
            data: {
                amount,
                category_id: category,
                name,
                description,
                price,
                stock,
            }
        })

        await stripe.products.update(
            updateProduct.stripe_product_id,
            {
                name: name,
                description: description,
                metadata: {
                    price: price,
                    stock: stock
                }
            }
        )


        return updateProduct

    }
}


export { UpdateProductUseCase }