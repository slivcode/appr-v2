import { toStr } from '../../../appr-core/src/main/to-str';
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
  let str = toStr(baseCn);
  $t.innerHTML = str;
  return $t;
};