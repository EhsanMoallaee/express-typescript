import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, { ProductDocument } from "../models/product.model";


export async function createProductService(input: Omit<ProductDocument, 'createdAt' | 'updatedAt'>) {
    return await ProductModel.create(input);
}

export async function findProductService(query: FilterQuery<ProductDocument>, options: QueryOptions = { lean: true }) {
    return ProductModel.findOne(query, {}, options);
}

export async function updateProductService(
    query: FilterQuery<ProductDocument>,
    update: UpdateQuery<ProductDocument>,
    options: QueryOptions = { lean: true }
    ) {
        return ProductModel.findOneAndUpdate(query, update, options)
}

export async function deleteProductService(query: FilterQuery<ProductDocument>) {
    return ProductModel.deleteOne(query);
}