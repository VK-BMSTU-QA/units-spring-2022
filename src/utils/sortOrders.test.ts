import {getSortFunction, sortByDate, sortByItemCount, sortOrders, sortTypes} from './sortOrders';
import {Order} from "../data/fakeOrders";

// Эту штуку пишем сами
// Возможно придется обновить снапшоты

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

	it('gt items count', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(1);
	});

	it('lt items count', () => {
		const order1 = {
			items: ['item1'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(-1);
	});

	it('null items items count', () => {
		const order1 = {
			items: null,
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});
});

describe('sortByDate function', () => {
	it('equal items count', () => {
		const order1 = {
			date: 1,
		};

		const order2 = {
			date: 1,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});
});

describe('getSortFunction', () => {
	it('wong type', () => {

		const result = getSortFunction('wrong type');

		expect(result).toBe(null);
	});
});

describe('sortOrders', () => {
	it('null length', () => {
		const orders: Order[] = [];
		const ordersOriginal: Order[] = [...orders];
		sortOrders(orders, getSortFunction(sortTypes.DATE)); // Ругается т.к. getSortFunction может вернуть null..

		expect(orders).toStrictEqual(ordersOriginal);
	});
});
