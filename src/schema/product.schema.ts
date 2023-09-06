import{ z } from 'zod';

const payloadSchema = {
    body: z.object({
        title: z.string({
            required_error: 'Title is required'
        }),
        description: z.string({
            required_error: 'Description is required'
        }).min(120, 'Description should be at least 120 charcters long'),
        price: z.number({
            required_error: 'Price is required'
        }),
        image: z.string({
            required_error: 'Image is required'
        }),
    })
}

const paramsSchema = {
    params: z.object({
        productId: z.string({
            required_error: 'ProductId is required'
        })
    })
}

export const createProductSchema = z.object({ ...payloadSchema });
export const updateProductSchema = z.object({ ...payloadSchema, ...paramsSchema});
export const getProductSchema = z.object({ ...paramsSchema});
export const deleteProductSchema = z.object({ ...paramsSchema});

export type CreateProductInput = z.TypeOf<typeof createProductSchema>;
export type UpdateProductInput = z.TypeOf<typeof updateProductSchema>;
export type GetProductInput = z.TypeOf<typeof getProductSchema>;
export type DeleteProductInput = z.TypeOf<typeof deleteProductSchema>;