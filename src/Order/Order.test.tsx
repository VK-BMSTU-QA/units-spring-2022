import React from 'react';
import 'jest';

const mocGetData: jest.Mock = jest.fn()
	.mockImplementationOnce(():string => 'aa')
	.mockImplementationOnce(():string => 'bb')
	.mockImplementationOnce(():string => 'cc');

describe('Order.tsx', () => {
	it('some test', () => {
		// test something here
	});
});
