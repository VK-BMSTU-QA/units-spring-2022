import {sortByItemCount, sortByDate, getSortFunction, sortTypes, sortOrders} from './sortOrders';
import {fakeOrders} from "../data/fakeOrders";

describe('sortByItemCount function', () => {
	it('same amount of items', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		expect(sortByItemCount(order1, order2)).toBe(0);
	});

	it('first order has less amount of items than second', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['item1', 'item2', 'item3'],
		};

		expect(sortByItemCount(order1, order2)).toBe(-1);
	});

	it('first order has more amount of items than second', () => {
		const order1 = {
			items: ['item1', 'item2', 'item3'],
		};

		const order2 = {
			items: ['item1', 'item2'],
		};

		expect(sortByItemCount(order1, order2)).toBe(1);
	});

	test.each([
		{order1: {date: 12}, order2: {items: ['item']}},
		{order1: {items: ['item']}, order2: {date: 12}},
		{order1: {date: 12}, order2: {date: 10}},
	])('at least one order has no items', ({order1, order2}) => {
		expect(sortByItemCount(order1, order2)).toBe(0);
	});
});

describe('sortByItemDate function', () => {
	it('orders have same dates', () => {
		const order1 = {
			date: 10,
		};

		const order2 = {
			date: 10,
		};

		expect(sortByDate(order1, order2)).toBe(0);
	});

	it('first order date is less than second order date', () => {
		const order1 = {
			date: 9,
		};

		const order2 = {
			date: 10,
		};

		expect(sortByDate(order1, order2)).toBe(1);
	});

	it('first order date is more than second order date', () => {
		const order1 = {
			date: 11,
		};

		const order2 = {
			date: 10,
		};

		expect(sortByDate(order1, order2)).toBe(-1);
	});

	test.each([
		{order1: {date: 12}, order2: {items: ['item']}},
		{order1: {items: ['item']}, order2: {date: 12}},
		{order1: {items: ['item']}, order2: {items: ['item']}},
	])('at least one order has no date', ({order1, order2}) => {
		expect(sortByDate(order1, order2)).toBe(0);
	});
});

describe('getSortFunction function', () => {
	it('sortType - DATE', () => {
		expect(getSortFunction(sortTypes.DATE)).toBe(sortByDate);
	});

	it('sortType - COUNT', () => {
		expect(getSortFunction(sortTypes.COUNT)).toBe(sortByItemCount);
	});

	it('argument is null', () => {
		expect(getSortFunction('')).toBe(null);
	});
});

describe('sortOrders function', () => {
	it('all arguments are correct', () => {
		const sortFunc = jest.fn();
		sortOrders(fakeOrders, sortFunc);
		expect(sortFunc).toBeCalled();
	});

	it('order is empty', () => {
		expect(sortOrders([], jest.fn())).toBeUndefined();
	});

	test.each([
		undefined,
		null,
		{},
		[],
	])('not valid sort function №%#', () => {
		expect(sortOrders([{}, {}], jest.fn())).toBeUndefined();
	});
});
