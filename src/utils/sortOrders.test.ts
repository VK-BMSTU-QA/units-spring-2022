import {getSortFunction, sortByDate, sortByItemCount, sortOrders, sortTypes} from './sortOrders';

describe('sortByItemCount function', () => {
	test.each([
		{order1: {items: ['item1', 'item2']}, order2: {items: ['1', '2']}, expected: 0},
		{order1: {items: ['itm1', 'itm2', 'itm3']}, order2: {items: ['1', '2']}, expected: 1},
		{order2: {items: ['itm1', 'itm2', 'itm3']}, order1: {items: ['1', '2']}, expected: -1},
		{order1: {items: ['1', '2']}, order2: {items: []}, expected: 1},
		{order1: {}, order2: {}, expected: 0},
	])('Testing order %s', ({order1, order2, expected}) => {
		const result = sortByItemCount(order1, order2);
		expect(result).toBe(expected);
	});	
});


describe('sortByDate function', () => {
	const now = Date.now();
	const oneHourLater = now + 3600 * 1000;
	test.each([
		{order1: null, order2: null, expected: 0},
		{order1: {date: now}, order2: {date: oneHourLater}, expected: 1},
		{order1: {date: oneHourLater}, order2: {date: now}, expected: -1},
		{order1: {date: now}, order2: {date: now}, expected: 0},
	])('Testing order %s', ({order1, order2, expected}) => {
		const result = sortByDate(order1, order2);
		expect(result).toBe(expected);
	});
});


describe('getSortFunction function', () => {
	test.each([
		{order: 'unknown', expected: null},
		{order: sortTypes.DATE, expected: sortByDate},
		{order: sortTypes.COUNT, expected: sortByItemCount}
	])('Returns correct sort type', ({order, expected}) =>  {
		const result = getSortFunction(order);
		expect(result).toBe(expected);
	});
});
