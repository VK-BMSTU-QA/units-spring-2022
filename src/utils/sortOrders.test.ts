import {getSortFunction, sortByDate, sortByItemCount, sortOrders} from './sortOrders';
import {Order} from '../data/fakeOrders';

describe('sortByItemCount function', () => {
	it.each([
		[
			'same items count',
			{items: ['item1', 'item2']},
			{items: ['1', '2']},
			0
		],
		[
			'the first bigger than the second',
			{items: ['1', '2', '3']},
			{items: ['1', '2']},
			1
		],
		[
			'the second bigger than the first',
			{items: ['1', '2']},
			{items: ['1', '2', '3']},
			-1
		],
		[
			'one order is empty',
			{items: []},
			{items: ['1', '2']},
			-1
		],
		[
			'items are undefined',
			{items: undefined},
			{items: undefined},
			0
		],
	]) ('%p', (name, firstOrder, secondOrder, expected) => {
		expect(sortByItemCount(firstOrder, secondOrder)).toEqual(expected);
	});
});

describe('sortByDate function', () => {
	it.each([
		[
			'same orders` data',
			{
				date: 1588359900000,
			},
			{
				date: 1588359900000,
			},
			0
		],
		[
			'the first newer than the second',
			{
				date: 1588359900001,
			},
			{
				date: 1588359900000,
			},
			-1
		],
		[
			'the second newer than the first',
			{
				date: 1588359900000,
			},
			{
				date: 1588359900001,
			},
			1
		],
		[
			'orders without data',
			{
				date: undefined,
			},
			{
				date: undefined,
			},
			0
		],
	]) ('%p', (name, firstOrder, secondOrder, expected) => {
		expect(sortByDate(firstOrder, secondOrder)).toEqual(expected);
	});
});

describe('getSortFunction function', () => {
	it.each([
		[
			'sort by count',
			'count',
			sortByItemCount,
		],
		[
			'sort by date',
			'date',
			sortByDate,
		],
		[
			'not date or count sort',
			'notCountAndNoteDate',
			null,
		],
	]) ('%p', (name, sortType, expected) => {
		expect(getSortFunction(sortType)).toEqual(expected);
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
					'1', '2','3'
				]
			}];
		const sortedFakeOrders: Order[] = [
			{
				id: 3,
				date: 1300000000000,
				shop: 'Lamodник.ru',
				items: [
					'1', '2','3'
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
	it('sort with the same date', () => {
		const fakeOrders: Order[] = [
			{
				id: 1,
				date: 1100000000000,
				shop: 'Сбереги Мега Маркер',
				items: ['1', '2', '3', '4', '5'],
			},
			{
				id: 2,
				date: 1100000000000,
				shop: 'Alihandro Express',
				items: [
					'1','2',
				]
			},
		];
		const sortedFakeOrders: Order[] = [
			{
				id: 1,
				date: 1100000000000,
				shop: 'Сбереги Мега Маркер',
				items: ['1', '2', '3', '4', '5'],
			},
			{
				id: 2,
				date: 1100000000000,
				shop: 'Alihandro Express',
				items: [
					'1','2',
				]
			},
		];
		sortOrders(fakeOrders, sortByDate);

		expect(fakeOrders).toStrictEqual(sortedFakeOrders);
	});

	it('sort order by orders count', () => {
		const fakeOrders: Order[] = [
			{
				id: 5,
				date: 1588359900000,
				shop: 'Сбереги Мега Маркер',
				items: ['1', '2', '3', '4', '5'],
			},
			{
				id: 2,
				date: 1652481120001,
				shop: 'Lamodник.ru',
				items: [
					'1','2'
				]
			},
			{
				id: 3,
				date: 1544356800002,
				shop: 'Alihandro Express',
				items: [
					'1', '2','3'
				]
			}];
		const sortedFakeOrders: Order[] = [
			{
				id: 2,
				date: 1652481120001,
				shop: 'Lamodник.ru',
				items: [
					'1', '2',
				]
			},
			{
				id: 3,
				date: 1544356800002,
				shop: 'Alihandro Express',
				items: [
					'1','2', '3'
				]
			},
			{
				id: 5,
				date: 1588359900000,
				shop: 'Сбереги Мега Маркер',
				items: ['1', '2', '3', '4', '5'],
			},];
		sortOrders(fakeOrders, sortByItemCount);

		expect(fakeOrders).toStrictEqual(sortedFakeOrders);
	});

	it('sort sorted orders by date', () => {
		const fakeOrders: Order[] = [
			{
				id: 1,
				date: 1588359900002,
				shop: 'Сбереги Мега Маркер',
				items: ['1', '2', '3', '4', '5'],
			},
			{
				id: 2,
				date: 1544356800001,
				shop: 'Alihandro Express',
				items: [
					'1',
				]
			},];
		const sortedFakeOrders: Order[] = fakeOrders;
		sortOrders(fakeOrders, sortByDate);

		expect(fakeOrders).toStrictEqual(sortedFakeOrders);
	});

	it('sort sorted orders by orders` count', () => {
		const fakeOrders: Order[] = [
			{
				id: 1,
				date: 1588359900002,
				shop: 'Сбереги Мега Маркер',
				items: ['1', '2'],
			},
			{
				id: 2,
				date: 1544356800001,
				shop: 'Alihandro Express',
				items: ['1', '2', '3', '4', '5']
			},];
		const sortedFakeOrders: Order[] = fakeOrders;
		sortOrders(fakeOrders, sortByItemCount);

		expect(fakeOrders).toStrictEqual(sortedFakeOrders);
	});

	it('sort empty orders', () => {
		const fakeOrders: Order[] = [];
		const sortedFakeOrders: Order[] = fakeOrders;
		sortOrders(fakeOrders, sortByItemCount);

		expect(fakeOrders).toStrictEqual(sortedFakeOrders);
	});
	it('sort the same count of orders', () => {
		const fakeOrders: Order[] = [
			{
				id: 1,
				date: 1544356800001,
				shop: 'Alihandro Express',
				items: ['1', '2',]
			},
			{
				id: 2,
				date: 1544356800001,
				shop: 'Alihandro Express',
				items: ['1', '2',]
			},];
		const sortedFakeOrders: Order[] = fakeOrders;
		sortOrders(fakeOrders, sortByItemCount);

		expect(fakeOrders).toStrictEqual(sortedFakeOrders);
	});
});

