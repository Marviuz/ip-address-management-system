import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetAuditLogsSchema } from '@ip-address-management-system/shared';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuditLogsService } from './audit-logs.service';

@Roles('super_admin')
@Controller('audit-logs')
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Get()
  findAll(@Query() payload: GetAuditLogsSchema) {
    return this.auditLogsService.findAll(payload);
  }

  @Get(':publicId')
  findOne(@Param('publicId') publicId: string) {
    return this.auditLogsService.findOne(publicId);
  }
}
