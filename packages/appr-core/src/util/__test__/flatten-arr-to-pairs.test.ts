import { pair } from 'ramda';
import { toStr } from '../../main/to-str';
import { flattenArrToPropPair } from '../flatten-arr-to-pairs';
import { pairExpander } from '../pair/pair-expander';
import { pairMerger } from '../pair/pair-merger';
let color = pair('color');
let background = pair('background');
let opacity = pair('opacity');
let border = pair('border');

test('reduce to pairs test', () => {
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

	console.log(toStr('.test')(pairMerger(pairExpander(i))));
});