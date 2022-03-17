jest.mock('../utils/getDate');
import React from 'react';
import { OrderComponent } from './Order';
import {getDate} from '../utils/getDate';
import {fakeOrders} from '../data/fakeOrders';
import {shallow, configure} from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {
	describe('Order.tsx', () => {
		beforeEach(() => {
			(getDate as jest.Mock).mockReturnValue('Нажми на носик');
		});
	
		afterEach(() => {
			jest.clearAllMocks();
		});
	
		it('no items', () => {
			const order = fakeOrders[0];
	
			const wrapper = shallow(<OrderComponent
				order={order}/>);
			expect(wrapper).toMatchSnapshot();
			expect(getDate).toBeCalled();
		});
		
		it('with items', () => {
			const order = fakeOrders[1];

			const wrapper = shallow(<OrderComponent order={order}/>);
			expect(wrapper).toMatchSnapshot();
			expect(getDate).toBeCalled();
		});
	
		
		test.each([
			{
				date: 5,
				shop: undefined, 
				items:[]
			},
			{
				date: undefined, 
				shop: 'amazon', 
				items:[1, 2]
			},
		])('OrderComponent({order: %s})', (order) => {
			const orderComponent = OrderComponent({order: order}); 
			expect(orderComponent).toBeNull();
		});
	
		
	});
});
