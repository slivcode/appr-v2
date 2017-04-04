import { toStr } from 'appr-core';
let head = document.head;
let g = (id: string) => {
  let $style = document.createElement('style');
  head.appendChild($style);
  $style.id = id;
  return $style;
};
export let insertAppr = (baseCn, apprSet) => {
  let sel = baseCn.replace(/\./g, '_');
  let $t = head.querySelector(`style#${sel}`);
  !$t && ($t = g(sel));
  $t.innerHTML = toStr(baseCn);
  return $t;
};