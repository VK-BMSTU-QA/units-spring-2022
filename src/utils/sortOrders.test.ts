import {getSortFunction, sortByDate, sortByItemCount, sortOrders, sortTypes} from './sortOrders';

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

	it('Sorts orders with different item count', () => {
		const order1 = {
			items: ['itm1', 'itm2', 'itm3'],
		};
		
		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);
		expect(result).toBe(1);

		const reverseResult = sortByItemCount(order2, order1);
		expect(reverseResult).toBe(-1);
	});

	it('Handles empty arrays', () =>{
		const order1 = {
			items: ['1', '2'],
		};

		const order2 = {
			items: [],
		};

		const result = sortByItemCount(order1, order2);
		expect(result).toBe(1);
	});

	it('Handles empty orders', () => {
		const order1 = {
		};
		const order2 = {
		};
		const result = sortByItemCount(order1, order2);
		expect(result).toBe(0);
	});
	
});


describe('sortByDate function', () => {
	it('Handles empty order', () => {
		const order1 = null;
		const order2 = null;

		const result = sortByDate(order1, order2);
		expect(result).toBe(0);
	});

	it('Sorts items by numeric date', () =>{
		const now = Date.now();
		const later = now + 3600 * 1000;
		
		const order1 = {date: now};
		const order2 = {date: later};

		const result = sortByDate(order1, order2);
		expect(result).toBe(1);

		const reverseResult = sortByDate(order2, order1);
		expect(reverseResult).toBe(-1);
	});

	it('Sorts orders with the same time', () => {
		const now = Date.now();
		const order1 = {date: now};
		const order2 = {date: now};

		const result = sortByDate(order1, order2);
		
		expect(result).toBe(0);
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
