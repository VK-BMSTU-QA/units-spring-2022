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

	it.each([
		[null, null],
		[{items: null}, {items: null}],
	])('bad case: null args', (order1, order2) => {
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

	it.each([
		[null, null],
		[{date: null}, {date: null}],
	])('bad case: null args', (order1, order2) => {
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
	it('sort orders', () => {
		const orders = [
			{items: ['1', '2']},
			{items: ['1', '2', '3']},
			{items: ['1']},
		];

		const sortFunc = jest.fn();
		sortOrders(orders, sortFunc);

		expect(sortFunc).toBeCalled();
	});

	it.each([
		[null],
		[[]],
	])('bad case: null orders', (orders) => {
		const sortFunc = jest.fn();
		sortOrders(orders, sortFunc);

		expect(sortFunc).not.toBeCalled();
	});
});
