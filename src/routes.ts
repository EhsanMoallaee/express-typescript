import { Express, Request, Response } from 'express';
import { createUserHandler } from './controller/user.controller';
import validate from './middleware/validateResource';
import { createUserSchema } from './schema/user.schema';
import { createUserSessionHandler, deleteUserSessionHandler, getUserSessionsHandler } from './controller/session.controller';
import { createSessionSchema } from './schema/session.schema';
import checkUser from './middleware/checkUser';
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from './schema/product.schema';
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from './controller/product.controller';

function routes(app: Express) {
    app.get('/healthCheck', (req: Request, res: Response) => {
        res.sendStatus(200)
    })

    app.post('/api/users', validate(createUserSchema), createUserHandler);

    app.post('/api/sessions', validate(createSessionSchema), createUserSessionHandler);
    app.get('/api/sessions', checkUser, getUserSessionsHandler);
    app.delete('/api/sessions', checkUser, deleteUserSessionHandler);

    app.get('/api/products/:productId', validate(getProductSchema), getProductHandler);
    app.post('/api/products', [checkUser, validate(createProductSchema)], createProductHandler);
    app.put('/api/products/:productId', [checkUser, validate(updateProductSchema)], updateProductHandler);
    app.delete('/api/products/:productId', [checkUser, validate(deleteProductSchema)], deleteProductHandler);
}

export default routes;