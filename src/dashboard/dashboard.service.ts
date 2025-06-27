import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mission, MissionStatus } from '../users/entities/mission.entity';
import { User, UserRole } from '../users/entities/user.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Mission)
    private missionsRepository: Repository<Mission>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getDashboardData(userId: number, role: UserRole) {
    if (role === UserRole.COMPANY) {
      return this.getCompanyDashboard(userId);
    } else {
      return this.getFreelanceDashboard(userId);
    }
  }

  private async getCompanyDashboard(companyId: number) {
    const missions = await this.missionsRepository.find({
      where: { companyId },
      relations: ['selectedFreelance'],
      order: { createdAt: 'DESC' },
    });

    const profiles = await this.usersRepository.find({
      where: { role: UserRole.FREELANCE, isAvailable: true },
      take: 5,
    });

    return {
      missions: missions.map((mission) => ({
        id: mission.id,
        title: mission.title,
        status: mission.status,
        budget: mission.budget,
        deadline: mission.endDate,
        createdAt: mission.createdAt,
      })),
      profiles: profiles.map((profile) => ({
        id: profile.id,
        name: `${profile.firstName} ${profile.lastName}`,
        rate: `${profile.rate}€/jour`,
        availability: profile.availability,
        skills: profile.skills,
        experience: `${profile.experience} ans`,
        missionId: 1, // À améliorer avec une vraie logique de matching
        missionTitle: 'Mission suggérée',
      })),
    };
  }

  private async getFreelanceDashboard(freelanceId: number) {
    const activeMissions = await this.missionsRepository.find({
      where: {
        selectedFreelanceId: freelanceId,
        status: MissionStatus.IN_PROGRESS,
      },
      relations: ['company'],
    });

    const availableMissions = await this.missionsRepository.find({
      where: { status: MissionStatus.PUBLISHED },
      relations: ['company'],
      take: 10,
    });
    return {
      activeMissions: activeMissions.map((mission) => ({
        id: mission.id,
        title: mission.title,
        company: mission.company.companyName,
        status: mission.status,
        progress: mission.progress,
        endDate: mission.endDate,
      })),
      availableMissions: availableMissions.map((mission) => ({
        id: mission.id,
        title: mission.title,
        company: mission.company.companyName,
        budget: mission.budget,
        duration: mission.duration,
        status: 'available',
        skills: mission.skills,
        urgency: mission.urgency,
      })),
      stats: {
        totalEarnings: 45000, // À calculer depuis les paiements
        pendingPayments: 11000,
        completedProjects: 8,
        averageRating: 4.8,
      },
    };
  }
}
