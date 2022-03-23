import {getSortFunction, sortByDate, sortByItemCount, sortOrders, sortTypes} from './sortOrders';
import {Order} from '../data/fakeOrders';

type SortsTestData = {
	order1: Order;
	order2: Order;
	expected: number;
};

describe('sortOrders function', () => {
	it('count sort type', () => {
		const orders = [
			{ items: ['item1', 'item2', 'item3'] },
			{ items: ['1', '2'] },
		];
		const sortFunc = jest.fn();
		sortOrders(orders, sortFunc);
		expect(sortFunc).toBeCalled();
	});

	it('undefined input', () => {
		const sortFunc = jest.fn();
		sortOrders(undefined, sortByItemCount);
		expect(sortFunc).not.toBeCalled();
	});
});

describe('getSortFunction function', () => {
	it('count sort type', () => {
		const result = getSortFunction(sortTypes.COUNT);
		expect(result).toBe(sortByItemCount);
	});

	it('date sort type', () => {
		const result = getSortFunction(sortTypes.DATE);
		expect(result).toBe(sortByDate);
	});

	it('bad sort type', () => {
		const result = getSortFunction('smth');
		expect(result).toBeNull();
	});
});

describe('sortByItemCount function', () => {
	const table = [
		['same items count', { order1: { items: ['item1', 'item2'] }, order2: { items: ['1', '2'] }, expected: 0} as SortsTestData],
		['first order is bigger', { order1: { items: ['item1', 'item2', 'item3'] }, order2: { items: ['1', '2'] }, expected: 1} as SortsTestData],
		['second order is bigger', { order1: { items: ['item1', 'item2'] }, order2: { items: ['1', '2', '3'] }, expected: -1} as SortsTestData],
		['undefined data', { order1: undefined as unknown as Order, order2: { items: ['1', '2'] }, expected: 0} as SortsTestData],
		['items in order is undefined', { order1: { /* items is undefined */ }, order2: { items: ['1', '2'] }, expected: 0} as SortsTestData],
	];
	it.each(table)('%s', (testName, testData) => {
		const typedTestData = testData as SortsTestData;
		expect(sortByItemCount(typedTestData.order1, typedTestData.order2)).toBe(typedTestData.expected);
	});
});

describe('sortByDate function', () => {
	const table = [
		['same date', { order1: { date: 123 }, order2: { date: 123 }, expected: 0} as SortsTestData],
		['first date is bigger', { order1: { date: 256 }, order2: { date: 123 }, expected: -1} as SortsTestData],
		['second date is bigger', { order1: { date: 123 }, order2: { date: 256 }, expected: 1} as SortsTestData],
		['undefined data', { order1: undefined as unknown as Order, order2: { date: 123 }, expected: 0} as SortsTestData],
		['date in order is undefined', { order1: { /* date is undefined */ }, order2: { date: 123 }, expected: 0} as SortsTestData],
	];
	it.each(table)('%s', (testName, testData) => {
		const typedTestData = testData as SortsTestData;
		expect(sortByDate(typedTestData.order1, typedTestData.order2)).toBe(typedTestData.expected);
	});
});
