import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuditLogsService } from './audit-logs.service';

@Roles('super_admin')
@Controller('audit-logs')
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Get()
  findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
  ) {
    return this.auditLogsService.findAll(page, pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditLogsService.findOne(Number(id));
  }
}
