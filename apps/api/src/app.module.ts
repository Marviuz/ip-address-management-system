import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NetworkAddressModule } from './network-address/network-address.module';
import { AuditLogsModule } from './audit-logs/audit-logs.module';

@Module({
  imports: [AuthModule, NetworkAddressModule, AuditLogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
