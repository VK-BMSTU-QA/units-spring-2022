import {sortTypes} from './sortOrders';
import {sortOrders} from './sortOrders';
import {getSortFunction} from './sortOrders';
import {sortByItemCount} from './sortOrders';
import {sortByDate} from './sortOrders';

describe('sortOrders function', () => {

	it('undefined orders', () => {
		const orders = undefined;
		const sortFunction = sortByItemCount;
		expect(sortOrders(orders, sortFunction)).toBe(undefined);
	});
	
});

describe('getSortFunction function', () => {
	it('null', () => {
		const sortType = '';

		const result = getSortFunction(sortType);

		expect(result).toBeNull();
	});

	it('sortByDate', () => {
		const sortType = sortTypes.DATE;

		const result = getSortFunction(sortType);

		expect(result).toBe(sortByDate);
	});

	it('sortByItemCount', () => {
		const sortType = sortTypes.DATE;

		const result = getSortFunction(sortType);

		expect(result).toBe(sortByDate);
	});

});

describe('sortByItemCount function', () => {
	test.each([
		{order1: {items: []}, order2: {items: []}, expected: 0},
		{order1: {items: ['item1', 'item2']}, order2: {items: ['1', '2']}, expected: 0},
		{order1: {items: ['item1']}, order2: {items: []}, expected: 1},
		{order1: {items: ['item1', 'item2', 'item3']}, order2: {items: ['1', '2']}, expected: 1},
		{order1: {items: []}, order2: {items: ['item2']}, expected: -1},
		{order1: {items: ['item1']}, order2: {items: ['1', '2']}, expected: -1},
	])('orders with several items', ({order1, order2, expected}) => {
		expect(sortByItemCount(order1, order2)).toBe(expected);
	});

	test.each([
		{order1: {items: undefined}, order2: {items: undefined}, expected: 0},
		{order1: {items: ['item1']}, order2: {items: undefined}, expected: 0},
		{order1: {items: undefined}, order2: {items: ['item2']}, expected: 0},
		{order1: {}, order2: {}, expected: 0},
	])('empty orders or items', ({order1, order2, expected}) => {
		expect(sortByItemCount(order1, order2)).toBe(expected);
	});
});

describe('sortByDate function', () => {	
	it('dates are undefined', () => { 
		const order1 = {
			date: undefined
		};
		const order2 = {
			date: undefined
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});

	it('orders are undefined', () => { 
		const order1 = {};
		const order2 = {};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

	test.each([
		{order1: {date: 10102020}, order2: {date: 10102020}, expected: 0},
		{order1: {date: 10102021}, order2: {date: 10102020}, expected: -1},
		{order1: {date: 10102020}, order2: {date: 10102021}, expected: 1},
	])('orders with not null dates', ({order1, order2, expected}) => {
		expect(sortByDate(order1, order2)).toBe(expected);
	});

	test.each([
		{order1: {date: undefined}, order2: {date: undefined}, expected: 0},
		{order1: {date: 10102020}, order2: {date: undefined}, expected: 0},
		{order1: {date: undefined}, order2: {date: 10102020}, expected: 0},
		{order1: {}, order2: {}, expected: 0},
	])('empty orders or date', ({order1, order2, expected}) => {
		expect(sortByDate(order1, order2)).toBe(expected);
	});

});
