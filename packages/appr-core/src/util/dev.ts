import { tap } from 'ramda';
import { inspect } from 'util';
export let log = tap(s => console.log(inspect(s, { colors: true, depth: 10 })));