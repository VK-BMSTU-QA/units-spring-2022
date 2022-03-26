import React from 'react';
import {OrderComponent} from './Order';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';

configure({ adapter: new Adapter() });


describe('Order.tsx', () => {
	let wrapper;

	beforeEach(() => {
		getDate.mockReturnValue('1 января, чт, 1970 год');
	});

	afterAll(() => {
		jest.resetModules();
	});

	it('Casual order', () => {
		
		const order: Order = {
			id: 1,
			date: 17032022,
			shop: 'MegaShop',
			items: ['Бургер', 'Кола']
		};

		wrapper = shallow(<OrderComponent order = {order}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('no items', ()=>{
		const order: Order = {
			id: 1,
			date: 17032022,
			shop: 'MegaShop',
			items: {}
		};
	
		wrapper = shallow(<OrderComponent order = {order}/>);
	
		expect(wrapper).toMatchSnapshot();
	});

	it('no date', ()=>{
		const order: Order = {
			id: 1,
			shop: 'MegaShop',
			items: ['Бургер', 'Кола']
		};
	
		wrapper = shallow(<OrderComponent order = {order}/>);

		expect(wrapper.getElement()).toBeNull();
	});

	it('no order', ()=>{
		const order: Order = {};
	
		wrapper = shallow(<OrderComponent order = {order}/>);

		expect(wrapper.getElement()).toBeNull();
	});
});
