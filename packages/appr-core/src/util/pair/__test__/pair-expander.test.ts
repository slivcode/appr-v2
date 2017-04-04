import { pairExpander } from '../pair-expander';
import { log } from '../../dev';
import { map, toPairs } from 'ramda';
import { pairMerger } from '../pair-merger';
test('pair expander test', () => {
  let arg = {
    color: {
      _: 'red',
      ':': {
        hover: 'blue',
        focus: 'green',
      },
    },
    background: {
      _: 'blue',
      ':': {
        hover: 'black',
      },
      '@media': {
        '(min-width: 640px)': 'red',
      },
    },
    opacity: 1,
    border: {
      '-color': 'red',
      '-style': {
        _: 'solid',
      },
    },
    '.': {
      'active': [
        { background: 'green' },
      ],
    },
    transition: {
      _: {
        color: '1s',
        background: '2s',
      },
      ':': {
        hover: {
          color: '0.5a',
        },
      },
      '@media': {
        '(min-width: 640px)': {
          color: '0.5s',
        },
      },
    },
    filter: {
      _: {
        blur: '2px',
      },
      ':': {
        hover: {
          blur: '10px',
        },
      },
    },
  };
  let t = pairExpander(toPairs(arg));
  // log(t);
  let m = expect(t);
  let cases = [
    ['color', 'red'],
    ['background', 'blue'],
    [':hover', [['background', 'black']]],
    [':hover', [['color', 'blue']]],
    [':focus', [['color', 'green']]],
    ['opacity', 1],
    ['@media(min-width: 640px)', [['background', 'red']]],
    ['border-color', 'red'],
    ['border-style', 'solid'],
    ['.active', [{ background: 'green' }]],
    ['transition', {
      color: '1s',
      background: '2s',
    }],
    ['filter', { blur: '2px' }],
    [':hover', [['filter', { blur: '10px' }]]],
  ];
  map((s) => m.toContainEqual(s))(cases);
  // log(pairMerger(t));
});