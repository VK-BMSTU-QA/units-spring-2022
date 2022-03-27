import {getSortFunction, sortByDate, sortByItemCount, sortOrders, sortTypes} from './sortOrders';
import {Order} from '../data/fakeOrders';

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
			items: ['item1'],
		};
		const order2 = {
			items: ['1', '2'],
		};
		const result = sortByItemCount(order1, order2);
		expect(result).toBe(-1);
	});

	it('first order is empty', () => {
		const order1 = {
			items: [],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(-1);
	});

	it('second order is empty', () => {
		const order1 = {
			items: ['1'],
		};
		const order2 = {
			items: [],
		};
		const result = sortByItemCount(order1, order2);
		expect(result).toBe(1);
	});

	it('no items in orders', () => {
		const order1= {};
		const order2 = {};
		const result = sortByItemCount(order1, order2);
		expect(result).toBe(0);
	});
});

describe('sortByDate function', () => {
	it('same orders` data', () => {
		const order1 = {
			date: 1,
		};
		const order2 = {
			date: 1,
		};
		const result = sortByDate(order1, order2);
		expect(result).toBe(0);
	});

	it('the first newer than the second', () => {
		const order1 = {
			date: 2,
		};
		const order2 = {
			date: 1,
		};
		const result = sortByDate(order1, order2);

		expect(result).toBe(-1);
	});

	it('the second newer than the second', () => {
		const order1 = {
			date: 1,
		};
		const order2 = {
			date: 2,
		};
		const result = sortByDate(order1, order2);
		expect(result).toBe(1);
	});

	it('the first newer than the second', () => {
		const order1 = {};
		const order2 = {};
		const result = sortByDate(order1, order2);
		expect(result).toBe(0);
	});
});

describe('getSortFunction function', () => {
	it('sort by date', () => {
		expect(getSortFunction(sortTypes.DATE)).toBe(sortByDate);
	});
	it('sort by count', () => {
		expect(getSortFunction(sortTypes.COUNT)).toBe(sortByItemCount);
	});
	it('not date or count sort', () => {
		expect(getSortFunction('notCountAndNoteDate')).toBeNull();
	});
});

describe('sortOrders function', () => {
	it('comparator func is calling', () => {
		const orders: Order[] = [
			{id: 1},
			{id: 2},
		];
		const mockFunc = jest.fn();
		expect(() => {
			sortOrders(orders, mockFunc);
		}).not.toThrow();
		expect(mockFunc).toBeCalled();
	});

	it('empty orders-> comparator func is not calling', () => {
		const orders: Order[] = [];
		const sortedOrders: Order[] = [];
		const mockFunc = jest.fn();
		expect(() => {
			sortOrders(orders, mockFunc);
		}).not.toThrow();
		expect(orders).toEqual(sortedOrders);
		expect(mockFunc).not.toBeCalled();
	});
});
