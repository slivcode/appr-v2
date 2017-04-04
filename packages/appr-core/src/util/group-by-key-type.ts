import { cond, groupBy, T } from 'ramda';
import { isStartWith } from './is';
export let groupByKeyType = groupBy(([k]) => cond([
  [isStartWith('.'), () => 'c'],
  [isStartWith('@media'), () => 'm'],
  [isStartWith(':'), () => 'p'],
  [T, () => 'b'],
])(k));