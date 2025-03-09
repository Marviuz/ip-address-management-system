export type CreateFeatureFlags<TFlag extends string, TType> = {
  [TKey in keyof TType as `can${Capitalize<TFlag>}${Capitalize<string & TKey>}`]: boolean;
};
