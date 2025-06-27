import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from '../users/entities/invoice.entity';
import { InvoicesService } from '../invoices/invoices.service';
import { InvoicesController } from '../invoices/invoices.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice])],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
