import { join, map, mapObjIndexed, pipe, toPairs } from 'ramda';
import { wrapBraces } from '../util/str';
import { toCss } from './to-css';
import { mapJoinLine } from '../util/fn';
import { ApprSet } from './types';
export let toKeyframes: (name: string) => (keyframes: { [s: string]: ApprSet }) => string
  = (name) => pipe(
  toPairs,
  mapJoinLine(([k, v]) => toCss(k)(v)),
  wrapBraces(`@keyframes ${name}`),
);
