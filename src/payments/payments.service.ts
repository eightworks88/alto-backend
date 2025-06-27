import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../users/entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
  ) {}

  async findAllByFreelance(freelanceId: number) {
    return this.paymentsRepository.find({
      where: { freelanceId },
      order: { createdAt: 'DESC' },
    });
  }
}
