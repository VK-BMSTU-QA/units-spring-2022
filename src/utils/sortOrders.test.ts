import {sortByDate, sortByItemCount} from './sortOrders';

describe('sortByItemCount function', () => {
	it('one of item is null', () => {
		const order1 = null;

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

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

	it('first longer', () => {
		const order1 = {
			items: ['item1', 'item2', 'item3'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(1);
	});

	it('second longer', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1', '2', '3'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(-1);
	});
});

describe('sortByDate function', () => {
	it('one of item is null', () => {
		const order1 = null;

		const order2 = {
			date: 1588359900000,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});

	it('same items date', () => {
		const order1 = {
			date: 1588359900000,
		};

		const order2 = {
			date: 1588359900000,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});

	it('first older', () => {
		const order1 = {
			date: 1588360000000,
		};

		const order2 = {
			date: 1588359900000,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(-1);
	});

	it('second older', () => {
		const order1 = {
			date: 1588359900000,
		};

		const order2 = {
			date: 1588360000000,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(1);
	});
});

