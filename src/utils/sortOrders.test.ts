import {getSortFunction, sortByDate, sortByItemCount, sortOrders, sortTypes} from './sortOrders';

describe('sortOrders function', () => {
	it('count sort type', () => {
		const orders = [
			{ items: ['item1', 'item2', 'item3'] },
			{ items: ['1', '2'] },
		];
		const ordersCopy = [...orders];
		sortOrders(orders, sortByItemCount);
		expect(orders).not.toStrictEqual(ordersCopy);
	});

	it('bad data', () => {
		const orders = [
			{ items: ['item1', 'item2', 'item3'] },
			{ items: ['1', '2'] },
		];
		const ordersCopy = [...orders];
		sortOrders(undefined, sortByItemCount);
		expect(orders).toStrictEqual(ordersCopy);
	});
});

describe('getSortFunction function', () => {
	it('count sort type', () => {
		const result = getSortFunction(sortTypes.COUNT);
		expect(result).toBe(sortByItemCount);
	});

	it('date sort type', () => {
		const result = getSortFunction(sortTypes.DATE);
		expect(result).toBe(sortByDate);
	});

	it('bad sort type', () => {
		const result = getSortFunction('smth');
		expect(result).toBeNull();
	});
});

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

	it('first order is bigger', () => {
		const order1 = {
			items: ['item1', 'item2', 'item3'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(1);
	});

	it('second order is bigger', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1', '2', '3'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(-1);
	});

	it('null data', () => {
		const order2 = {
			items: ['1', '2', '3'],
		};

		const result = sortByItemCount(null, order2);

		expect(result).toBe(0);
	});

	it('bad input data', () => {
		const order1 = {};

		const order2 = {
			items: ['1', '2', '3'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});
});

describe('sortByDate function', () => {
	it('same date', () => {
		const order1 = {
			date: 123,
		};

		const order2 = {
			date: 123,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});

	it('first date is bigger', () => {
		const order1 = {
			date: 256,
		};

		const order2 = {
			date: 123,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(-1);
	});

	it('second date is bigger', () => {
		const order1 = {
			date: 123,
		};

		const order2 = {
			date: 256,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(1);
	});

	it('null data', () => {
		const order2 = {
			items: ['1', '2', '3'],
		};

		const result = sortByDate(null, order2);

		expect(result).toBe(0);
	});

	it('bad input data', () => {
		const order1 = {};

		const order2 = {
			date: 123,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});
});
