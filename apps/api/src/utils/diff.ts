import { type ChangeSchema } from '@ip-address-management-system/shared';
import { diff as deepDiff } from 'deep-diff';

function $diff<TOld, TNew>(...params: Parameters<typeof deepDiff<TOld, TNew>>) {
  const [old, newData] = params;
  const diffs = deepDiff(old, newData);
  return diffs
    ?.filter((item) => item.kind === 'E')
    .map((item) => ({
      ...item,
      new: item.rhs,
      old: item.lhs,
    }));
}

export function diff<TOld, TNew>(
  ...params: Parameters<typeof deepDiff<TOld, TNew>>
): ChangeSchema {
  const [old, newData] = params;
  const changes = $diff(old, newData);

  if (!changes) return {};

  return changes.reduce((acc, data, i) => {
    acc[data.path?.join('.') ?? i] = {
      old: data.old,
      new: data.new,
    };
    return acc;
  }, {});
}
