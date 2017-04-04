import { adjust, anyPass, cond, identity, join, map, pipe, T, toPairs, when } from 'ramda';
import { isKeyEq, isObj } from '../is';
import { styleHyphenFormat } from '../str';
let pairsToWrapText = (t, f) => ([k, v]) => [k, pipe(
	when(isObj, toPairs),
	map(f),
	join(t),
)(v)];
let pairsToWrapSpaceText = pairsToWrapText(', ', ([k, v]) => `${k} ${v}`);
let pairsToWrapQuoteText = pairsToWrapText(' ', ([k, v]) => `${k}(${v})`);
let valTransformer = cond([
	[isKeyEq('transition'), pairsToWrapSpaceText],
	[anyPass([isKeyEq('transform'), isKeyEq('filter')]), pairsToWrapQuoteText],
	[T, identity],
]);
export let pairTransform = pipe(
	valTransformer,
	adjust(styleHyphenFormat, 0),
);