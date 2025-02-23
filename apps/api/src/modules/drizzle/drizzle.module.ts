import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from 'src/env';
import * as schema from './schema';

const DRIZZLE_MODULE = Symbol('drizzle-connection');

@Module({
  providers: [
    {
      provide: DRIZZLE_MODULE,
      useFactory: () => drizzle(env.DATABASE_URL, { schema }),
    },
  ],
  exports: [DRIZZLE_MODULE],
})
export class DrizzleModule {}
