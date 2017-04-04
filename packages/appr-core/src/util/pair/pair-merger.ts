import { concat, cond, merge, pipe, reduce, T } from 'ramda';
import { isArr, isObj } from '../is';
export let pairMerger = (pairs: any[]) => pipe(
	reduce((pr, [k, v]) => {
		let o = pr[k];
		pr[k] = cond([
			[isObj, () => merge(o, v)],
			[isArr, () => concat(o, v)],
			[T, () => v],
		])(o);
		return pr;
	}, {}),
)(pairs);