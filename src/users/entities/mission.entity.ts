import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Invoice } from './invoice.entity';

export enum MissionStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  PROFILE_PROPOSED = 'profile_proposed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum UrgencyLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum LocationType {
  REMOTE = 'remote',
  HYBRID = 'hybrid',
  ONSITE = 'onsite',
}

@Entity('missions')
export class Mission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  budget: string;

  @Column()
  duration: string;

  @Column('simple-array', { nullable: true })
  skills: string[];

  @Column({
    type: 'enum',
    enum: UrgencyLevel,
    default: UrgencyLevel.MEDIUM,
  })
  urgency: UrgencyLevel;

  @Column({
    type: 'enum',
    enum: LocationType,
    default: LocationType.REMOTE,
  })
  location: LocationType;

  @Column({
    type: 'enum',
    enum: MissionStatus,
    default: MissionStatus.DRAFT,
  })
  status: MissionStatus;

  @Column({ default: 0 })
  progress: number;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ default: 0 })
  applicants: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.companyMissions)
  @JoinColumn({ name: 'companyId' })
  company: User;

  @Column()
  companyId: number;

  @ManyToOne(() => User, (user) => user.freelanceMissions, { nullable: true })
  @JoinColumn({ name: 'selectedFreelanceId' })
  selectedFreelance: User;

  @Column({ nullable: true })
  selectedFreelanceId: number;

  @OneToMany(() => Invoice, (invoice) => invoice.mission)
  invoices: Invoice[];
}
