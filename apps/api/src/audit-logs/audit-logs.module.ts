import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { AuditLogsService } from './audit-logs.service';
import { AuditLogsController } from './audit-logs.controller';

@Module({
  imports: [DrizzleModule],
  controllers: [AuditLogsController],
  providers: [AuditLogsService],
})
export class AuditLogsModule {}
