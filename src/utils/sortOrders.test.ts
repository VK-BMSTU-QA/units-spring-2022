import {getSortFunction, sortByDate, sortByItemCount, sortOrders, sortTypes} from './sortOrders';

describe('sortOrders', ()=>{
	it('test sorting', () => {
		const orders = [
			{date: 20},
			{date: 5},
			{date: 1}
		];

		const sortFunc = jest.fn();
		sortOrders(orders, sortFunc);
		expect(sortFunc).toBeCalled();
	});

	it('test orders not array', () => {
		const orders = undefined;

		const sortFunc = jest.fn();
		const res = sortOrders(orders, sortFunc);
		expect(res).toBeUndefined();
	});
});

describe('test sortOrders function', () => {
	it('sortByItemsCount', () => {
		const sort = getSortFunction(sortTypes.COUNT);
		expect(sort).toBe(sortByItemCount);
	});
	it('sortByDate', () => {
		const sort = getSortFunction(sortTypes.DATE);
		expect(sort).toBe(sortByDate);
	});
});

describe('sortByItemCount function', () => {
	test.each([
		[['item1', 'item2'], ['1', '2'], 0],  //same items count
		[['1', '2', '3'], [], 1],  // second order is empty and shorter
		[undefined, ['item1', 'item2'], 0],  // order has undefined items
		[['item1'], ['item1', 'item2'], -1]  // second order has more items
	])('.sortByItemCount(%s, %s)', (items1, items2, expectedRes) => {
		const order1 = {
			items: items1
		};
	
		const order2 = {
			items: items2
		};

		const result = sortByItemCount(order1, order2);
		expect(result).toBe(expectedRes);
	});
});


describe('sortByDateCount function', () => {
	test.each([
		[5, 5, 0],  // equal
		[1, 5, 1], // first is smaller
		[31, 30, -1],  // first is bigger
		[undefined, 2, 0]  // has undefind
	])('.sortByDate(%i, %i)', (firstDate, secondDate, expectedRes) => {
		const order1 = {
			date: firstDate
		};
	
		const order2 = {
			date: secondDate
		};

		const result = sortByDate(order1, order2);
		expect(result).toBe(expectedRes);
	});
});
