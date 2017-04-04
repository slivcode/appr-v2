import { ifElse, map, toPairs } from 'ramda';
import { isKeyEq, isObj, isSpProps } from './is';
export let spPropsExpansion = [
	([k, v, r]) => isSpProps(r) && /[a-zA-Z]/.test(k[0]),
	([k, v, r, h]) => [r, [[k, v]]],
];
export let underscoreExpansion = [
	isKeyEq('_'),
	([k, v, r]) => [r, v],
];
export let dashExpansion = [
	([k]) => k.startsWith('-'),
	([k, v, r, h]) => ifElse(isObj)(
		() => h(r + k)(v),
		() => [r + k, h(r + k)(v)],
	)(v),
];
let propExpansion = (x) => [
	isKeyEq(x),
	([k, v, r]) => map(([_k, _v]) => [`${x}${_k}`, [[r, _v]]])(toPairs(v)),
];
let rootExpansion = (x) => [
	([k, v, r]) => r === x,
	([k, v]) => [`${x}${k}`, v],
];
export let mqPropExpansion = propExpansion('@media');
export let colonPropExpansion = propExpansion(':');
export let colonRootExpansion = rootExpansion(':');
export let mqRootExpansion = rootExpansion('@media');
export let dotRootExpansion = rootExpansion('.');
export let baseExpand = [
	colonRootExpansion,
	mqRootExpansion,
	dotRootExpansion,
	spPropsExpansion,
	underscoreExpansion,
	dashExpansion,
	mqPropExpansion,
	colonPropExpansion,
];