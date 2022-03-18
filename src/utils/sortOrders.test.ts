import { Order } from '../data/fakeOrders';
import {sortByItemCount, getSortFunction, sortTypes, sortByDate, sortOrders} from './sortOrders';

describe('sortByItemCount function', () => {
	test.each([
		[{items: ['item1', 'item2']}, {items: ['1', '2']}, 0],
		[{items: ['item1', 'item2']}, {items: ['2']}, 1],
		[{items: ['item1']}, {items: ['1', '2']}, -1],
	])('check defualt behaviour', (order1, order2, expected) => {
		expect(sortByItemCount(order1, order2)).toBe(expected);
	});

	test.each([
		[{}, {items: ['1', '2']}, 0],
		[{items: ['item1', 'item2']}, {}, 0],
		[{}, {}, 0],
	])('no items in order', (order1, order2, expected) => {
		expect(sortByItemCount(order1, order2)).toBe(expected);
	});
	
	it('order\'s items are empty', () => {
		const order1 = {
			items: [],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(-1);
	});
});

describe('sortByDate function', () => {
	test.each([
		[{date: 1588359900000}, {date: 1588359900000}, 0],
		[{date: 1588359900000}, {date: 1544359900000}, -1],
		[{date: 1544359900000}, {date: 1588359900000}, 1],
	])('check defualt behaviour', (order1, order2, expected) => {
		expect(sortByDate(order1, order2)).toBe(expected);
	});

	test.each([
		[{}, {date: 1588359900000}, 0],
		[{date: 1588359900000}, {}, 0],
		[{}, {}, 0],
	])('no date in order', (order1, order2, expected) => {
		expect(sortByDate(order1, order2)).toBe(expected);
	});
});


describe('getSortFunction function', () => {
	it('get sortByItemsCount', () => {
		const type = sortTypes.COUNT;

		const result = getSortFunction(type);

		expect(result).toBe(sortByItemCount);
	});

	it('get sortByDate', () => {
		const type = sortTypes.DATE;

		const result = getSortFunction(type);

		expect(result).toBe(sortByDate);
	});

	it('get null', () => {
		const type = '';

		const result = getSortFunction(type);

		expect(result).toBe(null);
	});
});

describe('sortOrders function', () => {
	it('sort by date', () => {
		const sortFunc = sortByDate;
		const orders: Order[] = [
			{date: 1544359900000},	
			{date: 1588359900000},	
		];
		const sortedOrders: Order[] = [
			{date: 1588359900000},	
			{date: 1544359900000},	
		];
		sortOrders(orders, sortFunc);

		expect(orders).toEqual(sortedOrders);
	});

	it('sort by items count', () => {
		const sortFunc = sortByItemCount;
		const orders: Order[] = [
			{items: ['1', '2']},	
			{items: ['item1']},	
		];
		const sortedOrders: Order[] = [
			{items: ['item1']},	
			{items: ['1', '2']},	
		];
		sortOrders(orders, sortFunc);

		expect(orders).toEqual(sortedOrders);
	});


	test.each([
		[[], sortByDate, undefined],
		[undefined, sortByItemCount, undefined],
	])('not valid', (orders, sortFunc, expected) => {
		expect(sortOrders(orders, sortFunc)).toBe(expected);
	});

});
