import { complement, contains, is, type } from 'ramda';
export let isStr = is(String);
export let isObj = i => type(i) === 'Object';
export let isArr = Array.isArray;
export let isStartWith = (t) => s => s.startsWith(t);
export let isPropPair = ([k, v]) => isStr(k) && complement(isObj)(v);
export let isKeyEq = t => ([k]) => k === t;
let spProps = ['transition', 'transform', 'filter'];
export let isSpProps = s => contains(s, spProps);