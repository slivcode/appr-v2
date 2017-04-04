import { toCss } from '../to-css';
import { map } from 'ramda';
import { shorthands } from '../../util/dev';
let { transition, color, opacity } = shorthands;
test('to css test', () => {
  let i = toCss('.first')([
    { color: 'red' },
    [
      opacity(0.5),
      transition({
        _: {
          color: '0.2s',
          background: '2s',
        },
        ':': {
          hover: {
            color: '1s',
            background: '1s',
          },
        },
      }),
    ],
    [
      {
        '@media': {
          '(max-width: 640px)': [
            color('blue'),
          ],
        },
        ':': {
          hover: [
            color('green'),
          ],
        },
      },
    ],
  ]);
  let m = expect(i);
  let cases = [
    /\.first/,
    /color: red/,
    /opacity: 0.5/,
    /:hover {/,
    /color: green;/,
    /@media\(max-width: 640px\)/,
    /transition: color 1s, background 1s/,
    /transition: color 0.2s, background 2s/,
  ];
  map(m.toMatch)(cases);
});