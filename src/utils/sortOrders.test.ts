import {sortByDate, sortByItemCount, sortOrders} from './sortOrders';
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
	it('the first bigger than the second', () => {
		const order1 = {
			items: ['item1', 'item2', 'item3'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(1);
	});
	it('the second bigger than the first', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1', '2', '5'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(-1);
	});
	it('one order is empty', () => {
		const order1 = {
			items: [],
		};

		const order2 = {
			items: ['1', '2', '5'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(-1);
	});
	it('two orders are empty', () => {
		const order1 = {
			items: [],
		};

		const order2 = {
			items: [],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});
});

describe('sortOrders function', () => {
	it('sort order by date', () => {
		const fakeOrders: Order[] = [
			{
				id: 1,
				date: 1100000000000,
				shop: 'Сбереги Мега Маркер',
				items: ['1', '2', '3', '4', '5'],
			},
			{
				id: 2,
				date: 1200000000000,
				shop: 'Alihandro Express',
				items: [
					'1','2',
				]
			},
			{
				id: 3,
				date: 1300000000000,
				shop: 'Lamodник.ru',
				items: [
					'1', '2',
				]
			}];
		const sortedFakeOrders: Order[] = [
			{
				id: 3,
				date: 1300000000000,
				shop: 'Lamodник.ru',
				items: [
					'1', '2',
				]
			},
			{
				id: 2,
				date: 1200000000000,
				shop: 'Alihandro Express',
				items: [
					'1','2',
				]
			},
			{
				id: 1,
				date: 1100000000000,
				shop: 'Сбереги Мега Маркер',
				items: ['1', '2', '3', '4', '5'],
			},
		];
		sortOrders(fakeOrders, sortByDate);

		expect(fakeOrders).toStrictEqual(sortedFakeOrders);
	});

	it('sort order by date', () => {
		const fakeOrders: Order[] = [
			{
				id: 1,
				date: 1588359900000,
				shop: 'Сбереги Мега Маркер',
				items: ['1', '2', '3', '4', '5'],
			},
			{
				id: 2,
				date: 1544356800000,
				shop: 'Alihandro Express',
				items: [
					'1',
				]
			},
			{
				id: 3,
				date: 1652481120000,
				shop: 'Lamodник.ru',
				items: [
					'1', '2',
				]
			}];
		const sortedFakeOrders: Order[] = [
			{
				id: 2,
				date: 1544356800000,
				shop: 'Alihandro Express',
				items: [
					'1',
				]
			},
			{
				id: 3,
				date: 1652481120000,
				shop: 'Lamodник.ru',
				items: [
					'1', '2',
				]
			}, {
				id: 1,
				date: 1588359900000,
				shop: 'Сбереги Мега Маркер',
				items: ['1', '2', '3', '4', '5'],
			},];
		sortOrders(fakeOrders,sortByItemCount );

		expect(fakeOrders).toStrictEqual(sortedFakeOrders);
	});

});

