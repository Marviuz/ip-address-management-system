import { Inject, Injectable } from '@nestjs/common';
import { asc, eq } from 'drizzle-orm';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { auditLogs, users } from 'src/drizzle/schema';
import { DrizzleDatabase } from 'src/drizzle/types/drizzle';
import { auditLogsColumns, usersColumns } from 'src/utils/sensitive';
import { withPagination } from 'src/utils/with-pagination';

@Injectable()
export class AuditLogsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDatabase) {}

  async findAll(page = 1, pageSize = 10) {
    const query = this.db
      .select({ ...auditLogsColumns, user: usersColumns })
      .from(auditLogs)
      .leftJoin(users, eq(auditLogs.userId, users.id));

    const totalItems = await this.db.$count(auditLogs);
    const data = await withPagination(
      query.$dynamic(),
      asc(auditLogs.id),
      page,
      pageSize,
      totalItems,
    );
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} auditLog`;
  }
}
