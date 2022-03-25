import {getSortFunction, sortByDate, sortByItemCount, sortOrders, sortTypes} from './sortOrders';
import {fakeOrders} from "../data/fakeOrders";

describe('sortOrders function', () => {
	test.each([
		{orders: null},
		{orders: {}},
	])('invalid orders', (orders) => {
		expect(sortOrders(orders, sortByItemCount)).toBe(undefined);
	});

	it('sortFunction calling', () => {
		const orders = fakeOrders;

		const spy = jest.spyOn(orders, 'sort');

		sortOrders(orders, sortByItemCount);
		expect(spy).toHaveBeenCalled();
	});

});

describe('getSortFunction', () => {
	test.each([
		{order: sortTypes.COUNT, expected: 'sortByItemCount'},
		{order: sortTypes.DATE, expected: 'sortByDate'},
	])('different ortType', ({order, expected}) => {
		expect(getSortFunction(order)?.name).toBe(expected);
	});

	it('invalid sortType', () => {
		expect(getSortFunction(null)).toBeNull();
	});
});

describe('sortByItemCount function', () => {
	test.each([
		{order1: null, order2: {items: ['1', '2']}, expected: 0},
		{order1: {items: ['item1', 'item2']}, order2: {items: ['1', '2']}, expected: 0},
		{order1: {items: ['item1', 'item2', 'item3']}, order2: {items: ['1', '2']}, expected: 1},
		{order1: {items: ['item1', 'item2']}, order2: {items: ['1', '2', '3']}, expected: -1},
	])('sortByItemCount', ({order1, order2, expected}) => {
		expect(sortByItemCount(order1, order2)).toBe(expected);
	});
});

describe('sortByDate function', () => {
	test.each([
		{order1: null, order2: {date: 1588359900000}, expected: 0},
		{order1: {date: 1588359900000}, order2: {date: 1588359900000}, expected: 0},
		{order1: {date: 1588360000000}, order2: {date: 1588359900000}, expected: -1},
		{order1: {date: 1588359900000}, order2: {date: 1588360000000}, expected: 1},
	])('sortByDate', ({order1, order2, expected}) => {
		expect(sortByDate(order1, order2)).toBe(expected);
	});
});

