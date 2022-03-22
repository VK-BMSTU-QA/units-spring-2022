import {sortByItemCount, sortByDate, sortOrders, getSortFunction, sortTypes} from './sortOrders';
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
});
describe('simple tests sortByItemCount on equal, less, more and empty cases ', () => {
	test.each([
		[['item1', 'item2'], ['1', '2'],  0],
		[['item1', 'item2'], ['1'],  1],
		[['item1'], ['2'],  0],
		[[], ['2'],  -1],
		[[], [],  0],
		[NaN, NaN, 0],
	])('sortByItemCount(%i, %i, %i)', (a, b, expected) => {
		const order1 = {
			items: a,
		};
	
		const order2 = {
			items: b,
		};
		const res = sortByItemCount(order1, order2);
		expect(res).toEqual(expected);
	});
});


describe('sortByItemCount invalid', () => {
	it('all Nan', () => {
		
		const result = sortByItemCount(NaN, NaN);

		expect(result).toBe(0);
	});
	it('first Nan', () => {
		
		const order1 = {
			items: [1, 2],
		};

		const result = sortByItemCount(NaN, order1);

		expect(result).toBe(0);
	});
	it('second Nan', () => {
		
		const order1 = {
			items: [1, 2],
		};

		const result = sortByItemCount(order1, NaN);

		expect(result).toBe(0);
	});
});

describe('simple tests sortByDate on equal, less, more, empty and NaN cases ', () => {
	test.each([
		[[2000], [2001],  1],
		[[200], [100],  -1],
		[[2022], [2022],  0],
		[[], [],  0],
		[[NaN], [NaN],  0],
		[NaN, NaN,  0],

	])('sortByDate(%i, %i, %i)', (a, b, expected) => {
		const order1 = {
			date: a,
		};

		const order2 = {
			date: b,
		};
		const res = sortByDate(order1, order2);
		expect(res).toEqual(expected);

	});
});

describe('sortByDate invalid', () => {
	it('all Nan', () => {
		
		const result = sortByDate(NaN, NaN);

		expect(result).toBe(0);
	});
	it('first Nan', () => {
		
		const order1 = {
			items: [1, 2],
		};

		const result = sortByDate(NaN, order1);

		expect(result).toBe(0);
	});
	it('second Nan', () => {
		
		const order1 = {
			items: [1, 2],
		};

		const result = sortByDate(order1, NaN);

		expect(result).toBe(0);
	});
});

describe('simple tests getSortFunction with supported comparators and null values', () => {
	test.each([
		[NaN, null],
		[sortTypes.DATE, sortByDate],
		[sortTypes.COUNT, sortByItemCount],
		['nothing else', null],
	])('getSortFunction(%i)', (type, expected) => {

		const res = getSortFunction(type);
		expect(res).toEqual(expected);

	});
});

describe('sortByDate tests', () => {
	test.each([
		[[
			{date: 10}, {date: 20}, 
		], 
		sortByDate, 
		[
			{date: 20}, {date: 10}, 
		]
		],
		[[
			{date: 20}, {date: 10}, 
		], 
		sortByDate, 
		[
			{date: 20}, {date: 10}, 
		]
		],
		[[
			{date: 20}, {date: 20}, 
		], 
		sortByDate, 
		[
			{date: 20}, {date: 20}, 
		]
		],
		[[
			{date: 20}, {date: 20}, 
		], 
		sortByDate, 
		[
			{date: 20}, {date: 20}, 
		]
		],
		[[
			{date: 20}, 
		], 
		sortByDate, 
		[
			{date: 20}, 
		]
		],	
	])('sortOrder(%i, %i) -  by date', (orders, func, expected) => {
		expect(() => {
			sortOrders(orders, func);
		}).not.toThrow();
		expect(orders).toEqual(expected);
	});

	it('stable sort', () => {
		const orders  = [ 
			{
				id: 2,
				date: 2008,
			},
			{
				id: 1,
				date: 100,
			},
			{
				id: 1,
				date: 2008,
			}
		];
		const ordersSorted  = [ 
			{
				id: 2,
				date: 2008,
			},
			{
				id: 1,
				date: 2008,
			}, 
			{
				id: 1,
				date: 100,
			},
			
		];
	
		sortOrders(orders, sortByDate);
	
		expect(orders).toEqual(ordersSorted);
	});

	it('empty args for sortOrders call - expect empty result', () => {
		const orders: Order[] = [];

		const sortedOrders: Order[] = [];

		expect(() => {
			sortOrders(orders, sortByDate);
		}).not.toThrow();

		expect(orders).toEqual(sortedOrders);
	});
});


describe('sortByItemCount tests', () => {
	test.each([
		[[
			{items: [10]}, {items: [20]}, 
		], 
		sortByItemCount, 
		[
			{items: [10]}, {items: [20]}, 
		]
		],
		[[
			{items: [10, 20, 30]}, {items: [20, 30]}, 
		], 
		sortByItemCount, 
		[
			{items: [20, 30]}, {items: [10, 20, 30]}, 
		]
		],
	])('sortOrder(%i, %i) -  by items', (orders, func, expected) => {
		expect(() => {
			sortOrders(orders, func);
		}).not.toThrow();
		expect(orders).toEqual(expected);
	});

	it('empty args for sortOrders call - expect empty result', () => {
		const orders: Order[] = [];

		const sortedOrders: Order[] = [];

		expect(() => {
			sortOrders(orders, sortByItemCount);
		}).not.toThrow();

		expect(orders).toEqual(sortedOrders);
	});	
});