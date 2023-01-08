import {Response, Router} from "express";
import {RequestWithBody, RequestWithParams} from "../models/types";
import {userInputModel, userParamURIModel} from "../models/users-models";

import {usersService} from "../domain/users-service";
import {basicAuthMiddleware} from "../middlewares/basic-auth.middleware";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware/input-validation-middleware";

export const usersRouter = Router({})


usersRouter.post('/',
    basicAuthMiddleware,
    inputValidationMiddleware,
    async (req: RequestWithBody<userInputModel>, res: Response) => {
    const newUser = await usersService.createUser(
        req.body.login,
        req.body.password,
        req.body.email)
        res.status(201).send(newUser)

    })

usersRouter.delete('/:id',
    basicAuthMiddleware,
    inputValidationMiddleware,
    async (req: RequestWithParams<userParamURIModel>, res: Response) => {
    const isUserDeleted = await usersService.deleteUser(req.params.id)
        if (isUserDeleted) {
            res.sendStatus(204)
        }
        else {
            res.sendStatus(404)
        }

    })