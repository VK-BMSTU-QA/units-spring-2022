import {sortByItemCount, sortByDate, getSortFunction, sortTypes, sortOrders} from './sortOrders';

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
	
	it('first struct is empty', () => {
		const order1 = {};

		const order2 = {
			items: ['2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});
	
	it('second struct is empty', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});
	
	it('first struct with empty field', () => {
		const order1 = undefined;

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});
	
	it('first struct with empty field', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = undefined;

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});
});


describe('sortByDate function', () => {
	it('same date', () => {
		const order1 = {
			date: 1234,
		};

		const order2 = {
			date: 1234,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
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
	
	it('first struct is empty', () => {
		const order1 = {};

		const order2 = {
			date: 1234,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});
	
	it('second struct is empty', () => {
		const order1 = {
			date: 1234,
		};

		const order2 = {};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});
	
	it('first struct undefined', () => {
		const order1 = undefined;

		const order2 = {
			date: 1234,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});
	
	it('first struct undefined', () => {
		const order1 = {
			date: 1234,
		};

		const order2 = undefined;

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
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
	it('order is not array', () => {
		const orders = [
			{date: 1234},
			{date: 4321},
		];
		const sortFunc = jest.fn();
		sortOrders(orders, sortFunc);

		expect(sortFunc).toBeCalled();
	});

	it('order is undefined', () => {
		const result = sortOrders(undefined, jest.fn());

		expect(result).toBeUndefined();
	});

	it('order is not array', () => {
		const result = sortOrders(2, jest.fn());

		expect(result).toBeUndefined();
	});
});

