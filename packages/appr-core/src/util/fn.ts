import { join, map, pipe } from 'ramda';
export let blankPipe = i => (...fns) => i ? pipe(...fns)(i) : '';
export let blankPipeMapJoin = i => (f) => blankPipe(i)(
	map(f),
	join('\n'),
);