import {
	getSortFunction,
	sortByDate,
	sortByItemCount,
	sortOrders,
	sortTypes,
} from './sortOrders';
import { Order } from '../data/fakeOrders';

const sortingFunc = jest.fn();

describe('getSortFunction sortTypes tests', () => {
	it('Count type', () => {
		expect(getSortFunction(sortTypes.COUNT)).toBe(sortByItemCount);
	});
	it('Wrong type', () => {
		const sort = getSortFunction('WRONG');
		expect(sort).toBe(null);
	});

	it('Date type', () => {
		expect(getSortFunction(sortTypes.DATE)).toBe(sortByDate);
	});
});

describe('sortOrders function invalid arguments', () => {
	it('sorting empty array', () => {
		const orders: Order[] = [];

		sortOrders(orders, sortingFunc);
		expect(sortingFunc).toBeCalledTimes(0);
	});

	it('test orders undefined array', () => {
		expect(sortOrders(undefined, sortingFunc)).toBe(undefined);
	});
});



describe('sortByItemCount function valid arguments', () => {
	it('first order has more items', () => {
		const orderA: Order = {
			items: ['1', '2', '3', '4'],
		};
		const orderB: Order = {
			items: ['a', 'b', 'c'],
		};

		expect(sortByItemCount(orderA, orderB)).toBe(1);
	});

	it('first order has less items', () => {
		const orderA: Order = {
			items: ['a'],
		};
		const orderB: Order = {
			items: ['a', 'b', 'c'],
		};


		expect(sortByItemCount(orderA, orderB)).toBe(-1);
	});

	it('orders have equal amount of items', () => {
		const orderA: Order = {
			items: ['a', 'b', 'c'],
		};
		const orderB: Order = {
			items: ['1', '2', '3'],
		};

		expect(sortByItemCount(orderA, orderB)).toBe(0);
	});


});

describe('sortByItemCount function invalid arguments', () => {
	test.each([
		{
			a: {
				items: [],
			},

			b: {
				items: [],
			},
		},
		{
			a: {
				items: undefined,
			},

			b: {
				items: undefined,
			},
		},
		{
			a: undefined,
			b: undefined,
		},
	])('.sortByItemCount(%s, %s)', ({ a, b }) => {
		expect(sortByItemCount(a, b)).toBe(0);
	});
});

describe('sortByDate function valid inputs', () => {
	it('equal dates', () => {
		const orderA: Order = {
			date: 15000,
		};
		const orderB: Order = {
			date: 15000,
		};


		expect(sortByDate(orderA, orderB)).toBe(0);
	});

	it('first date is bigger', () => {
		const orderA: Order = {
			date: 100,
		};
		const orderB: Order = {
			date: 20,
		};


		expect(sortByDate(orderA, orderB)).toBe(-1);
	});

	it('second date is bigger', () => {
		const orderA: Order = {
			date: 100,
		};
		const orderB: Order = {
			date: 2000,
		};


		expect(sortByDate(orderA, orderB)).toBe(1);
	});
});


describe('sortByDate function invalid inputs', () => {
	test.each([
		{
			a: {
				date: -1,
			},

			b: {
				date: 0,
			},
		},
		{
			a: {
				date: undefined,
			},

			b: {
				date: undefined,
			},
		},
		{
			a: undefined,
			b: undefined,
		},
	])('sortByDate invalid inputs (%s, %s)', ({ a, b }) => {
		expect(sortByDate(a, b)).toBe(0);
	});
});

