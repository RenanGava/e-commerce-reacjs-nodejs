import { prisma } from "../../../prisma"
import { stripe } from "../../../service/Stripe"


class DeleteProductsUseCase {


    async execute(id: any) {
        const productAlreadyExists = await prisma.products.findFirst({
            where: { 
                id: id
            }
        })

        if(!productAlreadyExists){
            throw new Error("Product Not Exists!")
        }

        const [stripeDel, prismaDel] =  await Promise.all([
            stripe.products.update(productAlreadyExists.stripe_product_id,{
                active: false
            }),
            prisma.products.update({
                where:{
                    id: productAlreadyExists.id
                },
                data:{
                    active: false
                }
            })
        ])
        
        

        return {
            stripeDel,
            prismaDel
        }

    }
}

export { DeleteProductsUseCase }