import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Mission } from './mission.entity';

export enum InvoiceStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  PENDING = 'pending',
  PAID = 'paid',
  OVERDUE = 'overdue',
  CANCELLED = 'cancelled',
}

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  invoiceNumber: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  period: string;

  @Column({
    type: 'enum',
    enum: InvoiceStatus,
    default: InvoiceStatus.DRAFT,
  })
  status: InvoiceStatus;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ type: 'date', nullable: true })
  paidDate: Date;

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @ManyToOne(() => Mission, (mission) => mission.invoices)
  @JoinColumn({ name: 'missionId' })
  mission: Mission;

  @Column()
  missionId: number;

  @ManyToOne(() => User, (user) => user.companyInvoices)
  @JoinColumn({ name: 'companyId' })
  company: User;

  @Column()
  companyId: number;

  @ManyToOne(() => User, (user) => user.freelanceInvoices)
  @JoinColumn({ name: 'freelanceId' })
  freelance: User;

  @Column()
  freelanceId: number;

  @BeforeInsert()
  generateInvoiceNumber() {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');
    this.invoiceNumber = `INV-${year}-${random}`;
  }
}
