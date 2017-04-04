import { pipe } from 'ramda';
import { arrToMergedApprObj } from './arr-to-merged-appr-obj';
import { toStr } from './to-str';
import { ApprSet } from './types';
export let toCss: (rootCn: string) => (arr: ApprSet) => string
  = (rootCn) => pipe(
  arrToMergedApprObj,
  toStr(rootCn),
);