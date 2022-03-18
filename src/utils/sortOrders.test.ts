import { Order } from '../data/fakeOrders';
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

	it('order1 bigger', () => {
		const order1 = {
			items: ['item1', 'item2', 'item3'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(1);
	});

	it('order2 bigger', () => {
		const order1 = {
			items: ['item1'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(-1);
	});

	it('order1 zero', () => {
		const order1 = {
			items: [],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(-1);
	});

	it('order2 zero', () => {
		const order1 = {
			items: ['1'],
		};

		const order2 = {
			items: [],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(1);
	});

	it('no items', () => {
		const order1 = {};

		const order2 = {
			items: [],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});
});


describe('sortByDate function', () => {
	it('same date', () => {
		const order1 = {
			date: 500,
		};

		const order2 = {
			date: 500,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});

	it('order2 previously', () => {
		const order1 = {
			date: 300,
		};

		const order2 = {
			date: 200,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(-1);
	});

	it('order1 previously', () => {
		const order1 = {
			date: 300,
		};

		const order2 = {
			date: 900,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(1);
	});
	it('no date', () => {
		const order1 = {};

		const order2 = {
			date: 555,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});
});


describe('getSortFunction function', () => {
	it('Date sort type', () => {
		expect(getSortFunction(sortTypes.DATE)).toBe(sortByDate);
	});
	it('Count sort type', () => {
		expect(getSortFunction(sortTypes.COUNT)).toBe(sortByItemCount);
	});
	it('Unexpected sort type', () => {
		expect(getSortFunction('xxxx')).toBeNull();
	});
});


describe('sortOrders function', () => {
	const myComparator: (order1: Order, order2: Order) => number =
		(order1, order2) => (order1.id && order2.id) ? order1.id - order2.id: 0;

	it('stable sort', () => {
		const orders  = [ 
			{
				id: 2,
				date: 900,
			},
			{
				id: 1
			},
			{
				id: 2,
				date: 300,
			}
		];
		const ordersSorted  = [ 
			{
				id: 1
			},
			{
				id: 2,
				date: 900,
			},
			{
				id: 2,
				date: 300,
			}
		];

		sortOrders(orders, myComparator);

		expect(orders).toStrictEqual(ordersSorted);
	});

	it('no data', () => {
		const comparator  = jest.fn();
		sortOrders(undefined, comparator);
		expect(comparator).toBeCalledTimes(0);
	});
});

