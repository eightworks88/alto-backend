import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/decorators/roles.decorator';
import {
  CurrentUser,
  CurrentUserType,
} from '../auth/decorators/current-user.decorator';
import { UserRole } from '../users/entities/user.entity';
import { PaymentsService } from './payments.service';

@Controller('freelance/payments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.FREELANCE)
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Get()
  async findAll(@CurrentUser() user: CurrentUserType) {
    return this.paymentsService.findAllByFreelance(user.userId);
  }
}
