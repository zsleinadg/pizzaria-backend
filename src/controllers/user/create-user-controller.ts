import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/create-user-service";

class CreateUserController {
    async handle(req: Request, res: Response) {

        const { name, email, password } = req.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name: name,
            email: email,
            password: password
        });


        res.status(201).json(user);
    }
}

export { CreateUserController };