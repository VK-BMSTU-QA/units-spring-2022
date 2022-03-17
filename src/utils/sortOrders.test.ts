import {getSortFunction, sortByDate, sortByItemCount, sortOrders, sortTypes} from './sortOrders';
import {OrderComponent} from '../Order/Order';


describe('getSortFunction function', () => {
	test.each([
		{order: sortTypes.COUNT, expected: 'sortByItemCount'},
		{order: sortTypes.DATE, expected: 'sortByDate'},
	])('get sort function type', ({order, expected}) => {
		expect(getSortFunction(order)?.name).toBe(expected);
	});
});

describe('sortByItemCount function', () => {
	test.each([
		{first: {items: ['item1', 'item2']}, second: {items: ['1', '2']}, expected: 0},
		{first: {items: ['item1', 'item2']}, second: {items: ['1', '2', '3']}, expected: -1},
		{first: {items: ['item1', 'item2', 'item3']}, second: {items: ['1', '2']}, expected: 1},
	])('sort items with orders', ({first, second, expected}) => {
		expect(sortByItemCount(first, second)).toBe(expected);
	});

	test.each([
		{first: {date: 1588359900000}, second: {items: ['1', '2']}, expected: 0},
		{first: {items: ['item1', 'item2']}, second: {date: 1588359900000}, expected: 0},
		{first: {date: 1588359900000}, second: {date: 1588359900000}, expected: 0},
	])('sort items without orders', ({first, second, expected}) => {
		expect(sortByItemCount(first, second)).toBe(expected);
	});

	it('sort items with empty orders', () => {
		const order1 = {};
		const order2 = {};

		const result = sortByItemCount(order1, order2);
		expect(result).toBe(0);
	});
});

describe('sortByDate function', () => {
	test.each([
		{first: {date: 1588359900000}, second: {date: 1588359900000}, expected: 0},
		{first: {date: 1588369900000}, second: {date: 1588359900000}, expected: -1},
		{first: {date: 1588359900000}, second: {date: 1588369900000}, expected: 1},
	])('sort items date', ({first, second, expected}) => {
		expect(sortByDate(first, second)).toBe(expected);
	});

	test.each([
		{first: {date: 1588359900000}, second: {items: ['1', '2']}, expected: 0},
		{first: {items: ['item1', 'item2']}, second: {date: 1588359900000}, expected: 0},
	])('sort items without date', ({first, second, expected}) => {
		expect(sortByDate(first, second)).toBe(expected);
	});

	it('sort items with empty orders', () => {
		const order1 = {};
		const order2 = {};

		const result = sortByDate(order1, order2);
		expect(result).toBe(0);
	});
});

describe('sortOrders function', () => {
	test.each([
		{orders: [], sortFunction: sortByItemCount, expected: undefined},
		{orders: [], sortFunction: sortByDate, expected: undefined},
	])('empty orders', ({orders, sortFunction, expected}) => {
		expect(sortOrders(orders, sortFunction)).toBe(expected);
	});

	it('sort items by date', () => {
		const orders = [{date:1548359900000},{date:1588359900000}];
		const sorted = [{date:1588359900000},{date:1548359900000}];

		sortOrders(orders, sortByDate);
		expect(orders).toEqual(sorted);
	});
});

