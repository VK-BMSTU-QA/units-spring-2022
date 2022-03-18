import {sortOrders, getSortFunction, sortByDate, sortByItemCount} from './sortOrders';

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

	it('different items count', () => {
		const order1 = {
			items: ['item1', 'item2', 'item3']
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1,order2);
		expect(result).toBe(1);
	});

	it('no items', () => {
		const order1 = {};

		const order2 = {};

		const result = sortByItemCount(order1,order2);
		expect(result).toBe(0);
	});
});

describe('getSortFunction', () => {
	it('not valid sortType', () => {
		const sortType = 'number';
		const result = getSortFunction(sortType);
		expect(result).toBeNull();
	});
});

describe('sortByDate function', () => {
	it('same date', () => {
		const order1 = {
			date: 17032022
		};

		const order2 = {
			date: 17032022
		};

		const result = sortByDate(order1,order2);
		expect(result).toBe(0);
	});

	it('no date', () => {
		const order1 = {};

		const order2 = {};

		const result = sortByDate(order1,order2);
		expect(result).toBe(0);
	});
});

describe('sortOrders function', () => {
	it('sort by date', () => {
		const sortFunc = sortByDate;
		const orders: Order[] = [
			{
				date: 17032022,
			},	
			{
				date: 1703202217032022,
			},	
		];
		const sortedOrders: Order[] = [
			{
				date: 1703202217032022
			},	
			{
				date: 17032022,
			},	
		];
		sortOrders(orders, sortFunc);

		expect(orders).toEqual(sortedOrders);
	});
});

