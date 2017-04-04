import { join, map, pipe } from 'ramda';
export let blankPipe = i => (...fns) => i ? pipe(...fns)(i) : '';
export let mapJoinLine = (f) => pipe(map(f), join('\n'));
export let blankOrPipeMapJoin = i => (f) => blankPipe(i)(mapJoinLine(f));