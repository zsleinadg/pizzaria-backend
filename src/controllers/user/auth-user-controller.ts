import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/auth-user-service";

class AuthUserController {
    async handle(req: Request, res: Response) {

        const { email, password } = req.body;

        const authUserService = new AuthUserService()

        const session = await authUserService.execute({
            email: email,
            password: password
        })

        res.json(session)
    }
}

export { AuthUserController }