import { prisma } from "../../../prisma"
import { stripe } from "../../../service/Stripe"


class DeleteProductsUseCase {


    async execute(id: any) {
        const productAlreadyExists = await prisma.product.findFirst({
            where: { 
                id: id
            }
        })

        if(!productAlreadyExists){
            throw new Error("Product Not Exists!")
        }

        const productDesactive =  await Promise.all([
            stripe.products.update(productAlreadyExists.stripe_product_id,{
                active: false
            }),
            prisma.product.update({
                where:{
                    id: productAlreadyExists.id
                },
                data:{
                    active: false
                }
            })
        ])
        
        

        return productDesactive

    }
}

export { DeleteProductsUseCase }