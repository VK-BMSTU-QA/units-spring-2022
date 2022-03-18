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

	it('larger', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(1);
	});

	it('less', () => {
		const order1 = {
			items: ['item1'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(-1);
	});

	it('bad case: null data', () => {
		const result = sortByItemCount(null, null);

		expect(result).toBe(0);
	});

	it('bad case: null order date', () => {
		const order1 = {
			items: null,
		};

		const order2 = {
			items: null,
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});
});

describe('sortByDate function', () => {
	it('same', () => {
		const order1 = {
			date: 1,
		};

		const order2 = {
			date: 1,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});

	it('larger', () => {
		const order1 = {
			date: 2,
		};

		const order2 = {
			date: 1,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(-1);
	});

	it('less', () => {
		const order1 = {
			date: 1,
		};

		const order2 = {
			date: 2,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(1);
	});

	it('bad case: null data', () => {
		const result = sortByDate(null, null);

		expect(result).toBe(0);
	});

	it('bad case: null order date', () => {
		const order1 = {
			date: null,
		};

		const order2 = {
			date: null,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});
});

describe('getSortFunction function', () => {
	it('sort date', () => {
		const result = getSortFunction(sortTypes.DATE);

		expect(result).toBe(sortByDate);
	});

	it('sort count', () => {
		const result = getSortFunction(sortTypes.COUNT);

		expect(result).toBe(sortByItemCount);
	});

	it('bad case: null data', () => {
		const result = getSortFunction(typeof null);

		expect(result).toBeNull();
	});
});

describe('sortOrders function', () => {
	it('sort by item count', () => {
		const orders = [
			{items: ['1', '2']},
			{items: ['1', '2', '3']},
			{items: ['1']},
		];

		const sortFunc = jest.fn();
		sortOrders(orders, sortFunc);

		expect(sortFunc).toBeCalled();
	});

	it('sort by date', () => {
		const orders = [
			{date: 1},
			{date: 3},
			{date: 2},
		];

		const sortFunc = jest.fn();
		sortOrders(orders, sortFunc);

		expect(sortFunc).toBeCalled();
	});

	it('bad date', () => {
		const result = sortOrders(null, sortByDate);

		expect(result).toBe(undefined);
	});
});
