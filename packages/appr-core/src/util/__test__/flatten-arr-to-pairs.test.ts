import { flattenArrToPropPair } from '../flatten-arr-to-pairs';
import { shorthands } from '../dev';
import { map } from 'ramda';
let { opacity, border, background, color } = shorthands;
test('flatten array to pairs test', () => {
  let o = flattenArrToPropPair([
    [
      [
        background('red'),
      ],
      [
        [opacity(0)],
      ],
    ],
    {
      color: 'white',
    },
    [
      [
        {
          border: 'solid thin red',
        },
      ],
    ],
  ]);
  let m = expect(o);
  let t = [
    background('red'),
    opacity(0),
    color('white'),
    border('solid thin red'),
  ];
  map((v) => m.toContainEqual(v))(t);
});