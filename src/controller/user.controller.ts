import { Request, Response } from "express";
import { omit } from 'lodash';
import logger from "../utils/logger";
import { createUserService } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";

export async function createUserHandler(
        req: Request<{}, {}, CreateUserInput>,
        res: Response
    ) {
    try {
        const user = await createUserService(req.body);
        return res.status(201).send(user);
    } catch (error: any) {
        logger.error(error);
        return res.status(400).send(error.message);
    }
}