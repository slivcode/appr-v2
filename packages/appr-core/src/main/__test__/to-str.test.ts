import { pair } from 'ramda';
import { toStr } from '../to-str';
import { shorthands } from '../../util/dev';
import { flattenArrToPropPair } from '../../util/flatten-arr-to-pairs';
import { pairMerger } from '../../util/pair/pair-merger';
import { pairExpander } from '../../util/pair/pair-expander';

let { color, background, border, opacity } = shorthands;
test('to-str test', () => {
  let i = flattenArrToPropPair([
    color('red'),
    [
      background('blue'),
      [
        opacity({
          _: 0.5,
          ':': {
            hover: 1,
          },
        }),
        {
          filter: {
            blur: '2px',
          },
        },
      ],
      {
        '.stuff': [{ color: 'green' }],
        '.': {
          active: [{
            color: 'blue',
          }],
        },
      },
      {
        filter: {
          sepia: '0.5',
        },
      },
    ],
    [border('solid thin red')],
    {
      color: {
        _: 'red',
        ':': {
          hover: 'blue',
        },
      },
      transition: {
        _: {
          opacity: '0.5s',
        },
        ':': {
          hover: {
            opacity: '0.25s',
            color: '1s',
          },
        },
      },
      '@media': {
        '(max-width: 300px)': [{
          color: 'blue',
          ':hover': [{ color: 'red' }],
        }],
      },
    },
    pair('.inactive', [{
      color: 'green',
      borderStyle: 'dotted',
      ':': { hover: [{ color: 'blue' }] },
    },
      pair('.stuff', [{
        color: 'red',
        'backgroundColor': 'blue',
      }]),
    ]),
  ]);

  // console.log(toStr('.test')(pairMerger(pairExpander(i))));
});