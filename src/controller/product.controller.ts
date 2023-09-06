import { Request, Response, NextFunction } from "express";
import { CreateProductInput, DeleteProductInput, GetProductInput, UpdateProductInput } from "../schema/product.schema";
import { createProductService, deleteProductService, getProductService, updateProductService } from "../service/product.service";


export async function createProductHandler(req: Request<{}, {}, CreateProductInput['body']>, res: Response, next: NextFunction) {
    const userId = res.locals.user._id;
    const body = req.body;
    const product = await createProductService({...body, userId});
    return res.status(201).send(product);
}

export async function getProductHandler(req: Request<GetProductInput['params']>, res: Response, next: NextFunction) {
    const productId = req.params.productId;
    const product = await getProductService({productId});
    if(!product) return res.sendStatus(404);

    return res.status(200).send(product);
}

export async function updateProductHandler(req: Request<UpdateProductInput['params']>, res: Response, next: NextFunction) {
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const update = req.body;

    const product = await getProductService({productId});
    if(!product) return res.sendStatus(404);
    if(product.userId !== userId) return res.sendStatus(403);

    const updatedProduct = await updateProductService({productId}, update, { new: true });
    return res.status(200).send(updatedProduct);
}

export async function deleteProductHandler(req: Request<DeleteProductInput['params']>, res: Response, next: NextFunction) {
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const product = await getProductService({productId});
    if(!product) return res.sendStatus(404);
    if(product.userId !== userId) return res.sendStatus(403);
    await deleteProductService({productId});
    return res.sendStatus(200);
}