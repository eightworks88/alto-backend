import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mission, MissionStatus } from '../users/entities/mission.entity';
import { CreateMissionDto } from '../auth/dto/create-mission.dto';
import { UpdateMissionDto } from '../auth/dto/update-mission.dto';

@Injectable()
export class MissionsService {
  constructor(
    @InjectRepository(Mission)
    private missionsRepository: Repository<Mission>,
  ) {}

  async create(createMissionDto: CreateMissionDto, companyId: number) {
    const mission = this.missionsRepository.create({
      ...createMissionDto,
      companyId,
    });
    return this.missionsRepository.save(mission);
  }

  async findAllByCompany(companyId: number) {
    return this.missionsRepository.find({
      where: { companyId },
      relations: ['selectedFreelance'],
      order: { createdAt: 'DESC' },
    });
  }

  async findAllByFreelance(freelanceId: number) {
    const missions = await this.missionsRepository.find({
      where: [
        { selectedFreelanceId: freelanceId },
        { status: MissionStatus.PUBLISHED },
      ],
      relations: ['company'],
      order: { createdAt: 'DESC' },
    });

    return missions.map((mission) => ({
      id: mission.id,
      title: mission.title,
      company: mission.company.companyName,
      status: mission.status,
      rate: mission.budget,
      startDate: mission.startDate,
      endDate: mission.endDate,
      progress: mission.progress,
      totalDays: mission.duration,
      workedDays: 0, // À calculer
    }));
  }

  async findOne(id: number, companyId: number) {
    const mission = await this.missionsRepository.findOne({
      where: { id, companyId },
      relations: ['selectedFreelance'],
    });

    if (!mission) {
      throw new NotFoundException('Mission non trouvée');
    }

    return mission;
  }

  async update(
    id: number,
    updateMissionDto: UpdateMissionDto,
    companyId: number,
  ) {
    const mission = await this.findOne(id, companyId);
    Object.assign(mission, updateMissionDto);
    return this.missionsRepository.save(mission);
  }

  async remove(id: number, companyId: number) {
    const mission = await this.findOne(id, companyId);
    await this.missionsRepository.remove(mission);
    return { message: 'Mission supprimée avec succès' };
  }
}
