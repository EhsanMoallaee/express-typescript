import mongoose from 'mongoose';
// import { customAlphabet } from 'nanoid';
import * as nanoid from 'nanoid/async';
import { UserDocument } from './user.model';

const customAlphabet = nanoid.customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export interface ProductInput {
    userId: UserDocument["_id"];
    title: string;
    description: string;
    price: number;
    image: string;
}

export interface ProductDocument extends ProductInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true,
        default: () => `product_${customAlphabet()}`
    },
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
}, { timestamps: true })

const ProductModel = mongoose.model<ProductDocument>('Product', productSchema);

export default ProductModel;