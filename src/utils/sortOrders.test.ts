import {sortByDate, sortByItemCount, getSortFunction, sortTypes, sortOrders} from './sortOrders';
import {Order} from '../data/fakeOrders';


describe('sortByItemCount function', () => {
	test.each([
		[{ items: ['item1', 'item2'] }, { items: ['1', '2'] }, 0],  	// same items count
		[{}, { items: ['1'] }, 0],  									// first struct is empty
		[{ items: ['1', '2'] }, {}, 0],  								// second struct is empty
		[undefined, { items: ['1', '2'] }, 0],  						// first struct is undefined
		[{ items: ['1', '2'] }, undefined, 0],  						// second struct is undefined
	])('sortByItemCount(%s, %s) with same items or error', (order1, order2, expectedRes) => {
		const result = sortByItemCount(order1, order2);

		expect(result).toBe(expectedRes);
	});
	it('items count less', () => {
		const order1 = {
			items: ['item1'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(-1);
	});
	it('items count more', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(1);
	});
});

describe('sortByDate function', () => {
	test.each([
		[{ date: 123 }, { date: 123 }, 0],  	// same date
		[{}, { date: 123 }, 0],  				// first struct is empty
		[{ date: 123 }, {}, 0],  				// second struct is empty
		[undefined, { date: 123 }, 0],  		// first struct is undefined
		[{ date: 123 }, undefined, 0],  		// second struct is undefined
	])('sortByDate(%s, %s) with same items or error', (order1, order2, expectedRes) => {
		const result = sortByDate(order1, order2);

		expect(result).toBe(expectedRes);
	});
	it('date more', () => {
		const order1 = {
			date: 2,
		};

		const order2 = {
			date: 160,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(1);
	});
	it('date less', () => {
		const order1 = {
			date: 160,
		};

		const order2 = {
			date: 3,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(-1);
	});
});

describe('getSortFunction function', () => {
	it('sortByDate', () => {

		const result = getSortFunction(sortTypes.DATE);

		expect(result).toBe(sortByDate);
	});
	it('sortByItemCount', () => {

		const result = getSortFunction(sortTypes.COUNT);

		expect(result).toBe(sortByItemCount);
	});
	it('null', () => {

		const result = getSortFunction(null);

		expect(result).toBeNull();
	});
});

describe('sortOrders function', () => {
	it('test sorting', () => {
		const orders = [
			{date: 20},
			{date: 5},
			{date: 50}
		];

		const sortFunc = jest.fn();
		sortOrders(orders, sortFunc);
		expect(sortFunc).toBeCalled();
	});
	it('undefined', () => {
		const sortFunc = jest.fn();
		const result = sortOrders(undefined, sortFunc);

		expect(result).toBeUndefined();
	});
	it('first order is number', () => {
		const sortFunc = jest.fn();
		const result = sortOrders(2, sortFunc);

		expect(result).toBeUndefined();
	});
});
