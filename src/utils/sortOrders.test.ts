import {sortByItemCount, sortByDate, getSortFunction, sortTypes, sortOrders} from './sortOrders';

describe('sortByItemCount function', () => {
	test.each([
		[{ items: ['item1', 'item2'] }, { items: ['1', '2'] }, 0],  	// same items count
		[{}, { items: ['2'] }, 0],  									// first struct is empty
		[{ items: ['item1', 'item2'] }, {}, 0],  						// second struct is empty
		[undefined, { items: ['2', '3'] }, 0],  						// first struct is undefined
		[{ items: ['item1', 'item2'] }, undefined, 0],  				// second struct is undefined
	])('sortByItemCount(%s, %s) with same items or error', (order1, order2, expectedRes) => {
		const result = sortByItemCount(order1, order2);

		expect(result).toBe(expectedRes);
	});

	it('first items count less', () => {
		const order1 = {
			items: ['item2'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(-1);
	});
	
	it('second items count less', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(1);
	});
});


describe('sortByDate function', () => {
	test.each([
		[{ date: 1234 }, { date: 1234 }, 0],  	// same date
		[{}, { date: 1234 }, 0],  				// first struct is empty
		[{ date: 1234 }, {}, 0],  				// second struct is empty
		[undefined, { date: 1234 }, 0],  		// first struct is undefined
		[{ date: 1234 }, undefined, 0],  		// second struct is undefined
	])('sortByDate(%s, %s) with same items or error', (order1, order2, expectedRes) => {
		const result = sortByDate(order1, order2);

		expect(result).toBe(expectedRes);
	});

	it('first date less', () => {
		const order1 = {
			date: 1234,
		};

		const order2 = {
			date: 1243,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(1);
	});
	
	it('second date less', () => {
		const order1 = {
			date: 1243,
		};

		const order2 = {
			date: 1234,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(-1);
	});
});

describe('getSortFunction function', () => {
	it('sort type items count', () => {
		const result = getSortFunction(sortTypes.COUNT);

		expect(result).toBe(sortByItemCount);
	});

	it('sort type date', () => {
		const result = getSortFunction(sortTypes.DATE);

		expect(result).toBe(sortByDate);
	});

	it('sort type undefined', () => {
		const result = getSortFunction(undefined);

		expect(result).toBeNull();
	});
});

describe('sortOrders function', () => {
	test.each([
		[undefined, 0],  	// undefined order param
		[2, 0],  			// not Order array param
	])('sortOrders(%s, %s) with unexpected params', (orders, expectedRes) => {
		const result = sortOrders(orders, jest.fn());

		expect(result).toBeUndefined();
	});
	it('order is not array', () => {
		const orders = [
			{date: 1234},
			{date: 4321},
		];
		const sortFunc = jest.fn();
		sortOrders(orders, sortFunc);

		expect(sortFunc).toBeCalled();
	});
});

