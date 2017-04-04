import { pairMerger } from '../pair-merger';
import { shorthands } from '../../dev';
import { map, mapObjIndexed } from 'ramda';
let { opacity, color, transition, transform } = shorthands;
test('pair merger test', () => {
  let i = pairMerger([
    ['.active', [
      opacity(0.5),
    ]],
    transition({
      color: '0.5s',
    }),
    transition({
      transform: '1s',
    }),
    ['.active', [
      color('red'),
    ]],
    color('blue'),
  ]);
  let cases = {
    transition: {
      color: '0.5s',
      transform: '1s',
    },
    '.active': [color('red'), opacity(0.5)],
    color: 'blue',
  };
  expect(i).toHaveProperty('transition', cases.transition);
  expect(i['.active']).toEqual([opacity(0.5), color('red')]);
  expect(i).toHaveProperty('color', 'blue');

});