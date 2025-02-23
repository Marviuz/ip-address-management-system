import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from 'src/env';
import * as schema from './schema';

export const DRIZZLE = Symbol('drizzle-connection');

@Module({
  providers: [
    {
      provide: DRIZZLE,
      useFactory: () => drizzle(env.DATABASE_URL, { schema }),
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
