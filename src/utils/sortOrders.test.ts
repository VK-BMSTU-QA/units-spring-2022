import {
	sortByItemCount,
	sortByDate,
	sortOrders,
	sortTypes,
	getSortFunction,
} from './sortOrders';
import { Order } from '../data/fakeOrders';


describe('sortByItemCount function', () => {
	it('first greatest then second', () => {
		const a = { items: ['1', '2'] };
		const b = { items: ['1'] };

		expect(sortByItemCount(a, b)).toBe(1);
	});

	it('second greatest then first', () => {
		const a = { items: ['1'] };
		const b = { items: ['1', '2'] };

		expect(sortByItemCount(a, b)).toBe(-1);
	});

	it('equal items', () => {
		const a = { items: ['1', '2'] };
		const b = { items: ['1', '2'] };

		expect(sortByItemCount(a, b)).toBe(0);
	});

	it.each([
		[{items: ['1', '2'] }, {}],
		[{}, { items: ['1', '2'] }],
		[{}, {}],
	])('no items', (a, b) => {
		expect(sortByItemCount(a, b)).toBe(0);
	});
});


describe('sortByDate function', () => {
	it('first greatest then second', () => {
		const a = { date: 2 };
		const b = { date: 1 };

		expect(sortByDate(a, b)).toBe(-1);
	});

	it('second greatest then first', () => {
		const a = { date: 1 };
		const b = { date: 2 };

		expect(sortByDate(a, b)).toBe(1);
	});

	it('equal items', () => {
		const a = { date: 1 };
		const b = { date: 1 };

		expect(sortByDate(a, b)).toBe(0);
	});

	it.each([
		[{}, { date: 1 }],
		[{ date: 1 }, {}],
		[{}, {}],
	])('no date', (a, b) => {
		expect(sortByDate(a, b)).toBe(0);
	});
});

describe('getSortFunction function', () => {
	it('get sortByDate', () => {
		expect(getSortFunction(sortTypes.DATE)).toBe(sortByDate);
	});

	it('get sortByItemCount', () => {
		expect(getSortFunction(sortTypes.COUNT)).toBe(sortByItemCount);
	});

	it('get unknown function', () => {
		expect(getSortFunction('`')).toBeNull();
	});

	it.each([
		[{}, { date: 1 }],
		[{ date: 1 }, {}],
		[{}, {}],
	])('no date', (a, b) => {
		expect(sortByItemCount(a, b)).toBe(0);
	});
});

describe('sortOrders function', () => {
	it('correct values', () => {
		const orders = [
			{
				id: 1,
				date: 2,
			},
			{
				id: 2,
				date: 1,
			},
			{
				id: 3,
				date: 4,
			},
		];

		const mockFunc = jest.fn();

		sortOrders(orders, mockFunc);

		expect(mockFunc).toBeCalled();
	});

	it('empty orders', () => {
		const orders: Order[] = [];

		const sortedOrders: Order[] = [];

		sortOrders(orders, jest.fn());

		expect(orders).toStrictEqual(sortedOrders);
	});
});