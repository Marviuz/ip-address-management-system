import { type Primitive } from 'zod';

export type Changes = Record<
  string,
  {
    old: Primitive;
    new: Primitive;
  }
>;
