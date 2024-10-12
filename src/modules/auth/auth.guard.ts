import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { Request } from "express";

@Injectable()
export class JWTAuthGuard implements CanActivate {
    constructor(private authService: AuthService) { }
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest() as Request;
        const jwt = request.headers.authorization?.split('Bearer ')[1] as string
        const { user } = await this.authService.verifyJWT(jwt)
        request.session = { user }
        return true
    }
}


