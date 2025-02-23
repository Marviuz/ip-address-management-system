import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from 'src/modules/drizzle/drizzle.module';
import { accounts, users } from 'src/modules/drizzle/schema';
import { DrizzleDatabase } from 'src/modules/drizzle/types/drizzle';
import { OAuthUserSchema } from 'src/types/oauth-user';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDatabase) {}

  async findOneByProviderId(providerId: string) {
    const [user] = await this.db
      .select()
      .from(users)
      .leftJoin(accounts, eq(accounts.userId, users.id))
      .where(eq(accounts.providerAccountId, providerId))
      .limit(1);

    return user;
  }

  async createFromGoogle(googleUser: OAuthUserSchema) {
    const txData = await this.db.transaction(async (tx) => {
      try {
        const [insertedUser] = await tx
          .insert(users)
          .values({
            email: googleUser.email,
            familyName: googleUser.familyName,
            givenName: googleUser.givenName,
            middleName: googleUser.middleName,
            username: googleUser.username,
          })
          .returning();

        if (!insertedUser) {
          throw new Error('User failed to insert');
        }

        const [insertedAccount] = await tx
          .insert(accounts)
          .values({
            userId: insertedUser.id,
            provider: googleUser.provider,
            providerAccountId: googleUser.providerId,
          })
          .returning();

        if (!insertedAccount) {
          throw new Error('Account failed to insert');
        }

        return { user: insertedUser, account: insertedAccount };
      } catch {
        tx.rollback();
      }
    });

    if (!txData) {
      throw new Error('User failed to insert');
    }

    return this.findOneByProviderId(txData.account.providerAccountId);
  }
}
