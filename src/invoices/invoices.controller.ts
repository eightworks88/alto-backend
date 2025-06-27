import {
  Controller,
  Get,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/decorators/roles.decorator';
import {
  CurrentUser,
  CurrentUserType,
} from '../auth/decorators/current-user.decorator';
import { UserRole } from '../users/entities/user.entity';
import { InvoicesService } from './invoices.service';

@Controller('company/invoices')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.COMPANY)
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @Get()
  async findAll(@CurrentUser() user: CurrentUserType) {
    return this.invoicesService.findAllByCompany(user.userId);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.invoicesService.findOne(id, user.userId);
  }
}
