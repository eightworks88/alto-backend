import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Invoice } from '../entities/invoice.entity';
import { Mission } from '../entities/mission.entity';
import { Payment } from '../entities/payment.entity';

export enum UserRole {
  COMPANY = 'company',
  FREELANCE = 'freelance',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  // Company fields
  @Column({ nullable: true })
  companyName: string;

  @Column({ nullable: true })
  siret: string;

  @Column({ nullable: true })
  companyAddress: string;

  @Column({ nullable: true })
  companyPhone: string;

  // Freelance fields
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  rate: number;

  @Column('simple-array', { nullable: true })
  skills: string[];

  @Column({ nullable: true })
  experience: number;

  @Column({ nullable: true })
  availability: string;

  @Column({ nullable: true })
  location: string;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ nullable: true })
  profilePicture: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToMany(() => Mission, (mission) => mission.company)
  companyMissions: Mission[];

  @OneToMany(() => Mission, (mission) => mission.selectedFreelance)
  freelanceMissions: Mission[];

  @OneToMany(() => Invoice, (invoice) => invoice.company)
  companyInvoices: Invoice[];

  @OneToMany(() => Invoice, (invoice) => invoice.freelance)
  freelanceInvoices: Invoice[];

  @OneToMany(() => Payment, (payment) => payment.freelance)
  payments: Payment[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
