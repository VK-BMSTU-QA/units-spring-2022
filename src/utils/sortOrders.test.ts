import {sortByDate, sortByItemCount, getSortFunction, sortTypes, sortOrders} from './sortOrders';
import {Order} from '../data/fakeOrders';


describe('sortByItemCount function', () => {
	it('no orders', () => {
		const order2 = {
			items: ['1', '2'],
		};
		const result = sortByItemCount(null, order2);

		expect(result).toBe(0);
	});
	it('no orders2', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};
		const result = sortByItemCount(order1, null);

		expect(result).toBe(0);
	});
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
	it('items undefind', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: undefined,
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});
	it('items undefind2', () => {
		const order1 = {
			items: undefined,
		};

		const order2 = {
			items: ['item1', 'item2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});
});

describe('sortByDate function', () => {
	it('no orders', () => {
		const order2 = {
			date: 123,
		};
		const result = sortByDate(null, order2);

		expect(result).toBe(0);
	});
	it('no orders2', () => {
		const order1 = {
			date: 123,
		};
		const result = sortByDate(order1, null);

		expect(result).toBe(0);
	});
	it('date undefinde', () => {
		const order1 = {
			date: 123,
		};

		const order2 = {
			date: undefined,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});
	it('date undefinde 2', () => {
		const order1 = {
			date: undefined,
		};

		const order2 = {
			date: 123,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});
	it('same date', () => {
		const order1 = {
			date: 160,
		};

		const order2 = {
			date: 160,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
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

		expect(result).toBe(null);
	});
});

describe('sortOrders function', () => {
	it('undefind', () => {
		const result = sortOrders(undefined, (x: Order, y: Order) => 1);

		expect(result).toBe(undefined);
	});
	it('undefind2', () => {
		const result = sortOrders(2, (x: Order, y: Order) => 1);

		expect(result).toBe(undefined);
	});
});