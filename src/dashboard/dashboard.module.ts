import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mission } from '../users/entities/mission.entity';
import { User } from '../users/entities/user.entity';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Mission, User])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
