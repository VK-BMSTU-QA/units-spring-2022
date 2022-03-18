import React from 'react';
import {OrderComponent} from './Order';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';

configure({ adapter: new Adapter() });


describe('Order.tsx', () => {
	let wrapper;
	it('Casual order', () => {
		getDate.mockReturnValue('1 января, чт, 1970 год');
		const order: Order = {
			id: 1,
			date: 17032022,
			shop: 'MegaShop',
			items: ['Бургер', 'Кола']
		};

		const key = 0;

		wrapper = shallow(<OrderComponent key = {key} order = {order}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('no items', ()=>{
		getDate.mockReturnValue('1 января, чт, 1970 год');
		const order: Order = {
			id: 1,
			date: 17032022,
			shop: 'MegaShop',
			items: {}
		};
	
		const key = 0;
	
		wrapper = shallow(<OrderComponent key = {key} order = {order}/>);
	
		expect(wrapper).toMatchSnapshot();
	});

	it('no date', ()=>{
		getDate.mockReturnValue(null);
		const order: Order = {
			id: 1,
			shop: 'MegaShop',
			items: ['Бургер', 'Кола']
		};
	
		const key = 0;
	
		wrapper = shallow(<OrderComponent key = {key} order = {order}/>);

		expect(wrapper).toMatchSnapshot();
	});

	it('no order', ()=>{
		getDate.mockReturnValue(null);
		const order: Order = {};
	
		const key = 0;
	
		wrapper = shallow(<OrderComponent key = {key} order = {order}/>);

		expect(wrapper).toMatchSnapshot();
	});
});
