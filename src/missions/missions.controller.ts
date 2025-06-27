import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
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
import { MissionsService } from './missions.service';
import { CreateMissionDto } from '../auth/dto/create-mission.dto';
import { UpdateMissionDto } from '../auth/dto/update-mission.dto';

@Controller('company/missions')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.COMPANY)
export class CompanyMissionsController {
  constructor(private missionsService: MissionsService) {}

  @Get()
  async findAll(@CurrentUser() user: CurrentUserType) {
    return this.missionsService.findAllByCompany(user.userId);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.missionsService.findOne(id, user.userId);
  }

  @Post()
  async create(
    @Body() createMissionDto: CreateMissionDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.missionsService.create(createMissionDto, user.userId);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMissionDto: UpdateMissionDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.missionsService.update(id, updateMissionDto, user.userId);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.missionsService.remove(id, user.userId);
  }
}

@Controller('freelance/missions')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.FREELANCE)
export class FreelanceMissionsController {
  constructor(private missionsService: MissionsService) {}

  @Get()
  async findAll(@CurrentUser() user: CurrentUserType) {
    return this.missionsService.findAllByFreelance(user.userId);
  }
}
