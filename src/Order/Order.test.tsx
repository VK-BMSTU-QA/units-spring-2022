import React from 'react';
import {OrderComponent} from './Order';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';

configure({ adapter: new Adapter() });


describe('Order.tsx', () => {
	it('some test', () => {
		// test something here
	});
});

describe('Order.tsx', () => {
	const wrapper;
	getDate.mockReturnValue('1 января, чт, 1970 год');
	const order: Order = {
		id: 1,
		date: 17032022,
		shop: 'MegaShop',
		items: ['Бургер', 'Кола']
	};

	const key = 0;

	wrapper = shallow(<OrderComponent key = {key} order = {order}/>);

	it('render with default state', () => {
		expect(wrapper).toMatchSnapshot();
	});

	

});

describe('Order.tsx', () => {
	const wrapper;
	getDate.mockReturnValue('1 января, чт, 1970 год');
	const order: Order = {
		id: 1,
		date: 17032022,
		shop: 'MegaShop',
		items: {}
	};

	const key = 0;

	wrapper = shallow(<OrderComponent key = {key} order = {order}/>);

	it('no items', () => {
		expect(wrapper).toMatchSnapshot();
	});


});

describe('Order.tsx', () => {
	const wrapper;
	getDate.mockReturnValue('1 января, чт, 1970 год');
	const order: Order = {
		id: 1,
		shop: 'MegaShop',
		items: ['Бургер', 'Кола']
	};

	const key = 0;

	wrapper = shallow(<OrderComponent key = {key} order = {order}/>);

	it('no date', () => {
		expect(wrapper).toMatchSnapshot();
	});

	

});