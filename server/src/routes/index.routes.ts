import express, { Request, Response, Router } from 'express'
import { userRouter } from './user/user.routes'
import { categoryRouter } from './categories/categories.routes'
import { productsRouter } from './products/products.routes'
import { stripe } from '../service/Stripe'
import Stripe from 'stripe'

const router = Router()


router.use("/user", userRouter)
router.use("/categories", categoryRouter)
router.use("/products", productsRouter)


router.post('/webhook', express.raw({ type: "application/json" }), (request: Request, response: Response) => {

    const payload = request.body


    const endpointWebhook = process.env.ENDPOINT_WEBHOOK_KEY

    const signature = stripe.webhooks.generateTestHeaderString({
        payload: JSON.stringify(payload),
        secret: endpointWebhook
    })
    


    let event = stripe.webhooks.constructEvent(JSON.stringify(payload), signature, endpointWebhook)


    try {
        
        switch(event.type){
            case 'price.created':
                console.log("Price -->",event.type)
            case 'product.created':
                console.log("Product -->",event.type)
        }


    } catch (error) {

        // console.log(error)

        return response.status(400).json({
            message: `Webhooke error ${error.message}`
        })
    }
})



export { router }