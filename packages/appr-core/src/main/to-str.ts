import { pipe, toPairs } from 'ramda';
import { blankOrPipeMapJoin } from '../util/fn';
import { groupByKeyType } from '../util/group-by-key-type';
import { pairTransform } from '../util/pair/pair-transformer';
import { pairToStr, wrapBraces } from '../util/str';
import { arrToMergedApprObj } from './arr-to-merged-appr-obj';
export let toStr: (selector: string) => (o: Object) => string
  = (sel) => pipe(
  toPairs,
  groupByKeyType,
  ({ c, m, p, b }) => {
    let _b = blankOrPipeMapJoin(b)(pipe(
      pairTransform,
      pairToStr,
    ));
    _b !== '' && (_b = wrapBraces(sel)(_b));
    let _p = blankOrPipeMapJoin(p)(
      ([k, v]) => pipe(
        arrToMergedApprObj,
        toStr(sel + k),
      )(v),
    );
    let _m = blankOrPipeMapJoin(m)(
      ([k, v]) => pipe(
        arrToMergedApprObj,
        toStr(sel),
        wrapBraces(k),
      )(v),
    );
    let _c = blankOrPipeMapJoin(c)(
      ([k, v]) => pipe(
        arrToMergedApprObj,
        toStr(sel + k),
      )(v),
    );
    return _b + _m + _p + _c;
  },
);