import { Order } from '../data/fakeOrders';
import {sortByItemCount, getSortFunction, sortTypes, sortByDate, sortOrders} from './sortOrders';

describe('sortByItemCount function', () => {
	it('same items count', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

	it('order1 > order2', () => {
		const order1 = {
			items: ['item1', 'item2', 'item3'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(1);
	});

	it('order1 < order2', () => {
		const order1 = {
			items: ['item1'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(-1);
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

	it('no items in order', () => {
		const order1 = {
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});
});

describe('sortByDate function', () => {
	it('same dates', () => {
		const order1 = {
			date: 1588359900000,
		};

		const order2 = {
			date: 1588359900000,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});

	it('order1 > order2', () => {
		const order1 = {
			date: 1588359900000,
		};

		const order2 = {
			date: 1544359900000,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(-1);
	});

	it('order1 < order2', () => {
		const order1 = {
			date: 1544359900000,
		};

		const order2 = {
			date: 1588359900000,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(1);
	});

	it('no date in order', () => {
		const order1 = {
		};

		const order2 = {
			date: 1688359900000,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
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
});

