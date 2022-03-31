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
		{first: {date: 1588359900000}, second: {items: ['1', '2']}, expected: 0},
		{first: {items: ['item1', 'item2']}, second: {date: 1588359900000}, expected: 0},
		{first: {date: 1588359900000}, second: {date: 1588359900000}, expected: 0},
	])('sort orders without items', ({first, second, expected}) => {
		expect(sortByItemCount(first, second)).toBe(expected);
	});

	it('same items number', () => {
		const first = {items: ['item1', 'item2']};
		const second = {items: ['1', '2']};

		const result = sortByItemCount(first, second);

		expect(result).toBe(0);
	});

	it('first order has less items', () => {
		const first = {items: ['item1', 'item2']};
		const second = {items: ['1', '2', '3']};

		const result = sortByItemCount(first, second);

		expect(result).toBe(-1);
	});

	it('first order has more items', () => {
		const first = {items: ['item1', 'item2', 'item3']};
		const second = {items: ['1', '2']};

		const result = sortByItemCount(first, second);

		expect(result).toBe(1);
	});

	it('sort empty orders', () => {
		const first = {};
		const second = {};

		const result = sortByItemCount(first, second);

		expect(result).toBe(0);
	});
});

describe('sortByDate function', () => {
	it('same order date', () => {
		const first = {date: 1588359900000};
		const second = {date: 1588359900000};

		const result = sortByDate(first, second);

		expect(result).toBe(0);
	});

	it('first order has later date', () => {
		const first = {date: 1588369900000};
		const second = {date: 1588359900000};

		const result = sortByDate(first, second);

		expect(result).toBe(-1);
	});

	it('first order has earlier date', () => {
		const first = {date: 1588359900000};
		const second = {date: 1588369900000};

		const result = sortByDate(first, second);

		expect(result).toBe(1);
	});

	test.each([
		{first: {date: 1588359900000}, second: {items: ['1', '2']}, expected: 0},
		{first: {items: ['item1', 'item2']}, second: {date: 1588359900000}, expected: 0},
	])('sort orders without date', ({first, second, expected}) => {
		expect(sortByDate(first, second)).toBe(expected);
	});

	it('sort empty orders', () => {
		const first = {};
		const second = {};

		const result = sortByDate(first, second);

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

	it('sort orders by date', () => {
		const orders = [{date: 1548359900000}, {date: 1588359900000}];
		const sorted = [{date: 1588359900000}, {date: 1548359900000}];

		sortOrders(orders, sortByDate);

		expect(orders).toEqual(sorted);
	});
});

