import { GetAuditLogsSchema } from '@ip-address-management-system/shared';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { asc, desc, eq, ilike, inArray, or } from 'drizzle-orm';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { auditLogs, users } from 'src/drizzle/schema';
import { DrizzleDatabase } from 'src/drizzle/types/drizzle';
import { auditLogsColumns, usersColumns } from 'src/utils/sensitive';
import { withPagination } from 'src/utils/with-pagination';

@Injectable()
export class AuditLogsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDatabase) {}

  async findAll({
    page = 1,
    pageSize = 10,
    q,
    actions,
    sort,
    order,
  }: GetAuditLogsSchema) {
    const query = this.db
      .select({ ...auditLogsColumns, user: usersColumns })
      .from(auditLogs)
      .leftJoin(users, eq(auditLogs.userId, users.id));

    const builder = query.$dynamic();

    if (q) {
      await builder.where(
        or(
          ilike(users.username, `%${q}%`),
          ilike(users.givenName, `%${q}%`),
          ilike(users.familyName, `%${q}%`),
          ilike(users.middleName, `%${q}%`),
          ilike(auditLogs.ipAddress, `%${q}%`),
        ),
      );
    }

    if (actions) {
      await builder.where(inArray(auditLogs.action, actions));
    }

    let sortMethod = desc(auditLogs.id);

    if (sort && order) {
      if (sort === 'user') {
        if (order === 'desc') sortMethod = desc(users.givenName);
        if (order === 'asc') sortMethod = asc(users.givenName);
      } else {
        if (order === 'desc') sortMethod = desc(auditLogs[sort]);
        if (order === 'asc') sortMethod = asc(auditLogs[sort]);
      }
    }

    const totalItems = await this.db.$count(auditLogs);

    const data = await withPagination(
      builder,
      sortMethod,
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
