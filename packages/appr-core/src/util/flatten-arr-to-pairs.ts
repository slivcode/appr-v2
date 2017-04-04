import { __, allPass, append, concat, cond, pipe, reduce, toPairs } from 'ramda';
import { isArr, isObj, isStr } from './is';
export let flattenArrToPropPair = reduce((pr, ne) => cond([
	[isObj, pipe(
		toPairs,
		concat(pr),
	)],
	[allPass([isArr, ([k]) => isStr(k)]), append(__, pr)],
	[isArr, pipe(
		flattenArrToPropPair,
		concat(pr),
	)],
])(ne), []);