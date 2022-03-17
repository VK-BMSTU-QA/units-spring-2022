import {sortByItemCount, sortByDate, getSortFunction, sortTypes, sortOrders} from './sortOrders';
import type {Order} from '../data/fakeOrders';

type CallbackSortsTestData = {
	order1: Order;
	order2: Order;
	expected: number;
};

describe('sortOrders function', () => {
	it('expect sorting function to be called', () => {
		const orders: Array<Order> = [{
			items: ['item1', 'item2'],
		},
		{
			items: ['1', '2'],
		}];

		const sortFunc = jest.fn();

		sortOrders(orders, sortFunc);

		expect(sortFunc).toBeCalled();
	});

	it('empty array', () => {
		const orders: Array<Order> = [];

		const sortFunc = jest.fn();

		sortOrders(orders, sortFunc);

		expect(sortFunc).not.toBeCalled();
	});

	it('invalid sorting function', () => {
		const orders: Array<Order> = [{
			items: ['1', '2', '3'],
		},
		{
			items: ['1', '2', '3', '4'],
		},
		{
			items: ['1', '2'],
		}];

		const originalOrders = [...orders];

		sortOrders(orders, undefined as unknown as (order1: Order, order2: Order) => number);

		expect(orders).toStrictEqual(originalOrders);
	});
});

describe('getSortFunction function', () => {
	it('COUNT', () => {
		expect(getSortFunction(sortTypes.COUNT)).toBe(sortByItemCount);
	});

	it('DATE', () => {
		expect(getSortFunction(sortTypes.DATE)).toBe(sortByDate);
	});

	it('Not a sort type', () => {
		expect(getSortFunction('NotASortType')).toBe(null);
	});
});

describe('sortByItemCount function', () => {
	const table: Array<CallbackSortsTestData> = [
		{order1: undefined as unknown as Order, order2: { items: ['15'] }, expected: 0},
		{order1: { items: ['16'] }, order2: undefined as unknown as Order, expected: 0},
		{order1: { items: ['item1', 'item2'] }, order2: { items: ['1', '2'] }, expected: 0},
		{order1: { /* items is undefined */}, order2: { items: ['3', '4'] }, expected: 0},
		{order1: { items: ['5', '6'] }, order2: { /* items is undefined */ }, expected: 0},
		{order1: { items: ['7', '8', '9'] }, order2: { items: ['7', '8', '9'] }, expected: 0},
		{order1: { items: ['10', '11'] }, order2: { items: ['10', '11', '12'] }, expected: -1},
		{order1: { items: ['13', '14', '15'] }, order2: { items: ['13', '14'] }, expected: 1},
	];
	it.each(table)('.sortByItemCount($order1, $order2)', ({order1, order2, expected}) => {
		expect(sortByItemCount(order1, order2)).toBe(expected);
	});
});

describe('sortByDate function', () => {
	const table: Array<CallbackSortsTestData> = [
		{order1: undefined as unknown as Order, order2: { date: 8 }, expected: 0},
		{order1: { date: 9 }, order2: undefined as unknown as Order, expected: 0},
		{order1: { date: 0 }, order2: { date: 0 }, expected: 0},
		{order1: { /* date is undefined */}, order2: { date: 1 }, expected: 0},
		{order1: { date: 2 }, order2: { /* date is undefined */ }, expected: 0},
		{order1: { date: 4 }, order2: { date: NaN }, expected: 0},
		{order1: { date: NaN }, order2: { date: 5 }, expected: 0},
		{order1: { date: 3 }, order2: { date: 3 }, expected: 0},
		{order1: { date: 4 }, order2: { date: 5 }, expected: 1},
		{order1: { date: 7 }, order2: { date: 6 }, expected: -1},
	];
	it.each(table)('.sortByDate($order1, $order2)', ({order1, order2, expected}) => {
		expect(sortByDate(order1, order2)).toBe(expected);
	});
});