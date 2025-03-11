import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { type SetRequired } from 'type-fest';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { auditLogs, users } from 'src/drizzle/schema';
import { DrizzleDatabase } from 'src/drizzle/types/drizzle';
import { InsertUserSchema, UpdateUserSchema } from 'src/types/oauth-user';
import { usersColumns } from 'src/utils/sensitive';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDatabase) {}

  async findOneOrCreate(
    user: InsertUserSchema,
    ipAddress: string | null,
    userAgent: string | null,
  ) {
    const foundUser = await this.db.transaction(async (tx) => {
      try {
        const [$insertedUser] = await tx
          .insert(users)
          .values({
            ...user,
            role: 'regular',
          })
          .onConflictDoNothing({
            where: eq(users.providerId, user.providerId),
          })
          .returning();

        if ($insertedUser) {
          await tx.insert(auditLogs).values({
            action: 'create',
            entity: 'user',
            entityId: $insertedUser.id,
            userId: $insertedUser.id,
            metadata: {},
            userAgent,
            ipAddress,
            changes: {},
          });
        }

        const [$foundUser] = await tx
          .select(usersColumns)
          .from(users)
          .where(eq(users.providerId, user.providerId));

        return $foundUser;
      } catch (e) {
        // eslint-disable-next-line no-console -- log errors
        console.log(e);
        tx.rollback();
      }
    });

    return foundUser;
  }

  async updateUser(user: SetRequired<UpdateUserSchema, 'publicId'>) {
    const [updatedUser] = await this.db
      .update(users)
      .set(user)
      .where(eq(users.publicId, user.publicId))
      .returning();

    return updatedUser;
  }

  async findOneByPublicId(userPublicId: string) {
    const user = await this.db.query.users.findFirst({
      where: eq(users.publicId, userPublicId),
    });

    return user;
  }

  async findAuthedUser(userPublicId: string) {
    const [user] = await this.db
      .select(usersColumns)
      .from(users)
      .where(eq(users.publicId, userPublicId));

    return user;
  }
}
