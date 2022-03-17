import {sortByItemCount, sortByDate, sortOrders, sortTypes, getSortFunction} from './sortOrders';
import {Order} from '../data/fakeOrders';

test.each([
	[{items: ['1', '2']}, 	{items: ['1', '2']}, 	0],
	[{items: ['1', '2']}, 	{items: ['1']}, 		1],
	[{items: ['1']}, 		{items: ['1', '2']}, 	-1],
	[{},					{items: ['1', '2']}, 	0],
])('sortByItemCount function', (a, b, expected) => {
	expect(sortByItemCount(a, b)).toBe(expected);
});

test.each([
	[{date: 1}, {date: 1}, 	0],
	[{date: 2}, {date: 1}, 	-1],
	[{date: 1}, {date: 2}, 	1],
	[{},		{date: 1}, 	0],
])('sortByDate function', (a, b, expected) => {
	expect(sortByDate(a, b)).toBe(expected);
});

test.each([
	[sortTypes.DATE, 	sortByDate],
	[sortTypes.COUNT, 	sortByItemCount],
	['1', 				null],
])('getSortFunction function', (a, expected) => {
	expect(getSortFunction(a)).toBe(expected);
});

test('order by date', () => {
	const orders = [
		{
			id: 1,
			date: 2,
		},
		{
			id: 2,
			date: 1,
		},
		{
			id: 3,
			date: 4,
		}
	];

	const sorted_orders = [
		{
			id: 3,
			date: 4,
		},
		{
			id: 1,
			date: 2,
		},
		{
			id: 2,
			date: 1,
		}
	];

	expect(() => {
		sortOrders(orders, sortByDate);
	}).not.toThrow();

	expect(orders).toStrictEqual(sorted_orders);
});

test('empty orders', () => {
	const orders: Order[] = [];

	const sorted_orders: Order[] = [];

	expect(() => {
		sortOrders(orders, sortByDate);
	}).not.toThrow();

	expect(orders).toStrictEqual(sorted_orders);
});


test('order by items', () => {
	const orders = [
		{
			id: 1,
			items: ['1', '2'],
		},
		{
			id: 2,
			items: ['1', '2', '3'],
		},
		{
			id: 3,
			items: ['1'],
		}
	];

	const sorted_orders = [
		{
			id: 3,
			items: ['1'],
		},
		{
			id: 1,
			items: ['1', '2'],
		},
		{
			id: 2,
			items: ['1', '2', '3'],
		}
	];

	expect(() => {
		sortOrders(orders, sortByItemCount);
	}).not.toThrow();

	expect(orders).toStrictEqual(sorted_orders);
});
