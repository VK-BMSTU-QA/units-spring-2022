import {getSortFunction, sortByDate, sortByItemCount, sortOrders, sortTypes} from './sortOrders';
import {Order} from '../data/fakeOrders';

const sortingFunc = jest.fn();

describe('getSortFunction', ()=> {
	it('Count', () => {
		const sort = getSortFunction(sortTypes.COUNT);
		expect(sort).toBe(sortByItemCount);
	});
	it('Wrong type', () => {
		const sort = getSortFunction('WRONG');
		expect(sort).toBe(null);
	});
});




describe('sortOrders', () => {


	it('sorting empty array', () => {
		const orders: Order[] = [];

		sortOrders(orders, sortingFunc);
		expect(sortingFunc).toBeCalledTimes(0);
	});
	it('sorting array of 3', () => {
		const orders: Order[] = [
			{
				date: 10
			},
			{
				date: 20
			},
			{
				date: 30
			}];

		sortOrders(orders, sortingFunc);
		expect(sortingFunc).toBeCalledTimes(2);
	});

	it('sortByDate', () => {
		expect( getSortFunction(sortTypes.DATE)).toBe(sortByDate);
	});
	
	it('test orders undefined array', () => {
		expect(sortOrders(undefined, sortingFunc)).toBe(undefined);
	});
});

describe('sortByItemCount', () => {
	test.each([
		{
			a: {
				items: ['1', '2']
			}, 
			
			b: {
				items: ['a']				
			}, 
			
			expected: 1
		},
		{
			a: {
				items: ['a', 'b', 'c']
			}, 
			
			b: {
				items: ['1', '2', '3']
			}, 
			
			expected: 0
		},
		{
			a: {
				items: ['a']
			}, 
			
			b: {
				items: ['1', '2']
			}, 
			
			expected: -1
		},
		{
			a: {
				items: []
			}, 
			
			b: {
				items: []
			}, 
			
			expected: 0
		},
		{
			a: {
				items: undefined
			}, 
			
			b: {
				items: undefined
			}, 
			
			expected: 0
		},
		{
			a: undefined,
			b: undefined,
			expected: 0
		},
		
	])('.sortByItemCount(%s, %s)', ({a, b, expected}) => {
		expect(sortByItemCount(a, b)).toBe(expected);
	});
});


describe('sortByDateCount function', () => {
	test.each([
		{
			
			a: {
				date: 15000
			}, 
			
			b: {
				date: 15000
			}, 
			
			expected: 0
		}, 
		{
			
			a: {
				date: 100
			}, 
			
			b: {
				date: 20
			}, 
			
			expected: -1
		}, 
		{
			
			a: {
				date: -1
			}, 
			
			b: {
				date: 0
			}, 
			
			expected: 0
		}, 
		{
			
			a: {
				date: undefined
			}, 
			
			b: {
				date: undefined
			}, 
			
			expected: 0
		}, 
		{
			
			a: {
				date: 1
			}, 
			b: {
				date: 100
			}, 
			expected: 1
		}, 
		{
			
			a: undefined,
			b: undefined,
			expected: 0
		}, 
	])('.sortByDate(%i, %i)', ({a, b, expected}) => {
		expect( sortByDate(a, b)).toBe(expected);
	});
});