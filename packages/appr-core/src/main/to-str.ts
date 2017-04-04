import { pipe, toPairs } from 'ramda';
import { blankPipeMapJoin } from '../util/fn';
import { groupByKeyType } from '../util/group-by-key-type';
import { pairTransform } from '../util/pair/pair-transformer';
import { pairToStr, wrapBraces } from '../util/str';
import { toObj } from './to-obj';

export let toCss = (sel) => pipe(
  toPairs,
  groupByKeyType,
  ({ c, m, p, b }) => {
    let _b = blankPipeMapJoin(b)(pipe(
      pairTransform,
      pairToStr,
    ));
    _b !== '' && (_b = wrapBraces(sel)(_b));
    let _p = blankPipeMapJoin(p)(
      ([k, v]) => pipe(
        toObj,
        toCss(sel + k),
      )(v),
    );
    let _m = blankPipeMapJoin(m)(
      ([k, v]) => pipe(
        toObj,
        toCss(sel),
        wrapBraces(k),
      )(v),
    );
    let _c = blankPipeMapJoin(c)(
      ([k, v]) => pipe(
        toObj,
        toCss(sel + k),
      )(v),
    );
    return _b + _m + _p + _c;
  },
);