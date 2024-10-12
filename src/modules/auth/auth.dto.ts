import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { iUser } from "../user/dto/user.dto";

export class signInValidation {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}


export class SignUpUserDto implements Partial<iUser> {
    @IsNotEmpty()
    firstName: string

    @IsNotEmpty()
    lastName: string

    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/, {
        message:
            'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.',
    })
    password: string
}


export type iJWTpayload = {
    email: string
    name: string,
    sub: string
    id: string
}
