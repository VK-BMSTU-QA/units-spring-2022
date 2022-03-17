import {sortTypes} from './sortOrders';
import {sortOrders} from './sortOrders';
import {getSortFunction} from './sortOrders';
import {sortByItemCount} from './sortOrders';
import {sortByDate} from './sortOrders';

describe('sortOrders function', () => {

	it('undefined orders', () => {
		const orders = undefined;
		const sortFunction = sortByItemCount;
		expect(sortOrders(orders, sortFunction)).toBe(undefined);
	});
	
});

describe('getSortFunction function', () => {
	it('null', () => {
		const sortType = '';

		const result = getSortFunction(sortType);

		expect(result).toBe(null);
	});

	it('sortByDate', () => {
		const sortType = sortTypes.DATE;

		const result = getSortFunction(sortType);

		expect(result).toBe(sortByDate);
	});

	it('sortByItemCount', () => {
		const sortType = sortTypes.DATE;

		const result = getSortFunction(sortType);

		expect(result).toBe(sortByDate);
	});

});

describe('sortByItemCount function', () => {
	it('order1 === order2', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};
		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

	it('order1 > order2', () => {
		const order1 = {
			items: ['item1', 'item2', 'item3'],
		};
		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(1);
	});

	it('order1 < order2', () => {
		const order1 = {
			items: ['item1'],
		};
		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(-1);
	});
	
	it('!items1 || !items2 === true', () => { 
		const order1 = {
			items: [],
		};
		const order2 = {
			items: [],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

	it('!order1 || !order2 === true', () => { 
		const order1 = {};
		const order2 = {};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

});

describe('sortByDate function', () => {
	it('order1 === order2', () => {
		const order1 = {
			date: 10102020
		};
		const order2 = {
			date: 10102020
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});

	it('order1 > order2', () => {
		const order1 = {
			date: 10102021
		};
		const order2 = {
			date: 10102020
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(-1);
	});

	it('order1 < order2', () => {
		const order1 = {
			date: 10102020
		};
		const order2 = {
			date: 10102021
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(1);
	});
	
	it('!date1 || !date2 === true', () => { 
		const order1 = {
			date: undefined
		};
		const order2 = {
			date: undefined
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});

	it('!order1 || !order2 === true', () => { 
		const order1 = {};
		const order2 = {};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

});
