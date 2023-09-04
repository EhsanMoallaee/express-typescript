import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";

export async function createUserHandler(
        req: Request<{}, {}, CreateUserInput>,
        res: Response
    ) {
    try {
        console.log(req.body);
        const user = await createUser(req.body);
        return res.status(201).send(user);
    } catch (error: any) {
        logger.error(error);
        return res.status(400).send(error.message);
    }
}