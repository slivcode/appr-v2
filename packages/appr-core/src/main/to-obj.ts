import { pipe } from 'ramda';
import { flattenArrToPropPair } from '../util/flatten-arr-to-pairs';
import { pairExpander } from '../util/pair/pair-expander';
import { pairMerger } from '../util/pair/pair-merger';
export let toObj = pipe(
  flattenArrToPropPair,
  pairExpander,
  pairMerger,
);