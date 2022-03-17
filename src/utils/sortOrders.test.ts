import {getSortFunction, sortByDate, sortByItemCount, sortOrders, sortTypes} from './sortOrders';
import {Order} from '../data/fakeOrders';

describe('sortByItemCount function', () => {
	it.each([
		[{items: ['item1', 'item2']}, {items: ['item3', 'item4']}, 0],
		[{items: ['item1', 'item2']}, {items: ['item3']}, 1],
		[{items: ['item2']}, {items: ['item3', 'item4']}, -1],
	])('test data: %o %o %o', (order1, order2, expected) => {
		const result = sortByItemCount(order1, order2);
		expect(result).toBe(expected);
	});
});

describe('sortByDate function', () => {
	it.each([
		[{date: 1}, {date: 1}, 0],
		[{date: 1}, {date: 10}, 1],
		[{date: 10}, {date: 1}, -1],
	])('test data: %o %o %o', (order1, order2, expected) => {
		const result = sortByDate(order1, order2);
		expect(result).toBe(expected);
	});
});

describe('getSortFunction', () => {
	it('wong type', () => {
		const result = getSortFunction('wrong type');
		expect(result).toBe(null);
	});
});

describe('sortOrders', () => {
	it('null length', () => {
		const orders: Order[] = [];
		const ordersOriginal: Order[] = [...orders];
		sortOrders(orders, getSortFunction(sortTypes.DATE)); // Ругается т.к. getSortFunction может вернуть null..
		expect(orders).toStrictEqual(ordersOriginal);
	});
});
