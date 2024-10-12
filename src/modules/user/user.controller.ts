import { Controller, UseGuards, } from '@nestjs/common';
import { UserService } from './user.service';
import { JWTAuthGuard } from '../auth/auth.guard';

@Controller('staff')
@UseGuards(JWTAuthGuard)
export class UserController {
  constructor(private readonly staffService: UserService) { }

}
