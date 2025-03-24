import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { GetAuditLogsListPayload } from '@ip-address-management-system/shared';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuditLogsService } from './audit-logs.service';

@Roles('super_admin')
@Controller('audit-logs')
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Get()
  findAll(
    @Query('page', ParseIntPipe) page: GetAuditLogsListPayload['page'],
    @Query('pageSize', ParseIntPipe)
    pageSize: GetAuditLogsListPayload['pageSize'],
    @Query('q') q: GetAuditLogsListPayload['q'],
    @Query('actions') actions: GetAuditLogsListPayload['actions'],
  ) {
    return this.auditLogsService.findAll({
      page,
      pageSize,
      q,
      actions,
    });
  }

  @Get(':publicId')
  findOne(@Param('publicId') publicId: string) {
    return this.auditLogsService.findOne(publicId);
  }
}
