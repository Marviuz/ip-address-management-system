import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { desc, eq } from 'drizzle-orm';
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
      desc(auditLogs.id),
      page,
      pageSize,
      totalItems,
    );
    return data;
  }

  async findOne(publicId: string) {
    const [data] = await this.db
      .select({ ...auditLogsColumns, user: usersColumns })
      .from(auditLogs)
      .where(eq(auditLogs.publicId, publicId))
      .leftJoin(users, eq(auditLogs.userId, users.id));

    if (!data)
      throw new NotFoundException(
        `Audit log with id ${publicId} does not exist`,
      );

    return data;
  }
}
