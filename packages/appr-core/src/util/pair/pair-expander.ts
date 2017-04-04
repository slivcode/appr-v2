import { __, append, concat, cond, ifElse, nth, pipe, reduce, toPairs, when } from 'ramda';
import { baseExpand } from '../base-expand';
import { isObj, isStr } from '../is';

let handleObj = (expanders, k) => {
	let h = k => o => pipe(
		toPairs,
		reduce((pr, [_k, _v]) => {
			let t = cond(expanders)([_k, _v, k, k => when(isObj, h(k))]);
			return ifElse(pipe(nth(0), isStr), append(__, pr), concat(pr))(t);
		}, []),
	)(o);
	return h(k);
};

export let pairExpander = reduce((pr, [r, v]) =>
		ifElse(isObj)(
			pipe(
				handleObj(baseExpand, r),
				concat(pr),
			),
			() => append([r, v], pr),
		)(v)
	, []);