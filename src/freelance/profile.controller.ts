import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserRole } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('freelance/profile')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.FREELANCE)
export class ProfileController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getProfile(@CurrentUser() user) {
    return this.usersService.findOne(user.userId);
  }

  @Put()
  async updateProfile(
    @CurrentUser() user,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(user.userId, updateProfileDto);
  }
}
