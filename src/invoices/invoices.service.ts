import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from '../users/entities/invoice.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private invoicesRepository: Repository<Invoice>,
  ) {}

  async findAllByCompany(companyId: number) {
    const invoices = await this.invoicesRepository.find({
      where: { companyId },
      relations: ['mission', 'freelance'],
      order: { createdAt: 'DESC' },
    });

    return invoices.map((invoice) => ({
      id: invoice.invoiceNumber,
      mission: invoice.mission.title,
      freelance: `${invoice.freelance.firstName} ${invoice.freelance.lastName}`,
      amount: invoice.amount,
      period: invoice.period,
      status: invoice.status,
      dueDate: invoice.dueDate,
      paidDate: invoice.paidDate,
    }));
  }

  async findOne(id: number, companyId: number) {
    const invoice = await this.invoicesRepository.findOne({
      where: { id, companyId },
      relations: ['mission', 'freelance'],
    });

    if (!invoice) {
      throw new NotFoundException('Facture non trouvée');
    }

    return invoice;
  }
}
