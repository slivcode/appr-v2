import { toKeyframes } from '../to-keyframes';
import { shorthands } from '../../util/dev';
import { map } from 'ramda';
let { opacity } = shorthands;
test('to-keyframes test', () => {
  let i = toKeyframes('my-keyframes')({
    from: [
      opacity(0),
    ],
    to: [
      opacity(1),
    ],
  });
  let cases = [
    /@keyframes my-keyframes/,
    /from \{/,
    /opacity: 0/,
    /opacity: 1/,
    /to \{/,
  ];
  let m = expect(i);
  map(m.toMatch)(cases);
});