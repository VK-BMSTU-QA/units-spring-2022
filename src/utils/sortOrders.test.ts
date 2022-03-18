import {getSortFunction, sortByDate, sortByItemCount, sortOrders, sortTypes} from './sortOrders';
import {Order} from '../data/fakeOrders';

describe('sortByItemCount function', () => {
	it.each([
		[{items: ['item1', 'item2']}, {items: ['item3', 'item4']}, 0],
		[{items: ['item1', 'item2']}, {items: ['item3']}, 1],
		[{items: ['item2']}, {items: ['item3', 'item4']}, -1],
		[{items: null}, {items: ['item3', 'item4']}, 0],
		[null, {items: ['item3', 'item4']}, 0],
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
		[{date: null}, {date: 1}, 0],
		[null, {date: 1}, 0],
	])('test data: %o %o %o', (order1, order2, expected) => {
		const result = sortByDate(order1, order2);
		expect(result).toBe(expected);
	});
});

describe('getSortFunction function', () => {
	it('wrong type', () => {
		const result = getSortFunction('wrong type');
		expect(result).toBe(null);
	});
	it('DATE type', () => {
		const result = getSortFunction(sortTypes.DATE);
		expect(result).toBe(sortByDate);
	});
	it('COUNT type', () => {
		const result = getSortFunction(sortTypes.COUNT);
		expect(result).toBe(sortByItemCount);
	});
});

describe('sortOrders function', () => {
	it.each([
		[[{date: 3}, {date: 2}, {date: 1}], [{date: 3}, {date: 2}, {date: 1}], sortTypes.DATE],
		[[{date: 1}, {date: 2}, {date: 3}], [{date: 3}, {date: 2}, {date: 1}], sortTypes.DATE],
		[[], [], sortTypes.DATE],
		[[{items: ['', '']}, {items: ['', '', '']}, {items: ['']}], [{items: ['']}, {items: ['', '']}, {items: ['', '', '']}], sortTypes.COUNT],
		[[{items: ['']}, {items: ['', '', '']}, {items: ['', '']}], [{items: ['',]}, {items: ['', '']}, {items: ['', '', '']}], sortTypes.COUNT],
		[[], [], sortTypes.COUNT],
	])('subtest sortOrders', (orders1, orders2, type) => {
		sortOrders(orders1, getSortFunction(type));
		expect(orders1).toStrictEqual(orders2);
	});
});
