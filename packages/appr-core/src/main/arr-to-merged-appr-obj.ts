import { pipe } from 'ramda';
import { flattenArrToPropPair } from '../util/flatten-arr-to-pairs';
import { pairExpander } from '../util/pair/pair-expander';
import { pairMerger } from '../util/pair/pair-merger';
import { ApprSet } from './types';
export let arrToMergedApprObj: (arr: ApprSet) => Object
  = pipe(
  flattenArrToPropPair,
  pairExpander,
  pairMerger,
);