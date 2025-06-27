import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import {
  CurrentUser,
  CurrentUserType,
} from '../auth/decorators/current-user.decorator';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get()
  async getDashboard(@CurrentUser() user: CurrentUserType) {
    return this.dashboardService.getDashboardData(
      user.userId,
      user.role as any,
    );
  }
}
