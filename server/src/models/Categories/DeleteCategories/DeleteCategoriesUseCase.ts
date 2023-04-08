import { prisma } from "../../../prisma";
import {  } from 'querystring'




class DeleteCategoriesUseCase {

    async execute(category_id: any) {
        const categoryDelete = await prisma.category.delete({
            where:{
                id: category_id
            }
        })

        return categoryDelete
    }
}

export { DeleteCategoriesUseCase }