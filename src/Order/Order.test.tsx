import React from 'react';
import {OrderComponent} from './Order';
import {shallow, configure, ShallowWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Order } from '../data/fakeOrders';

jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {
	let wrapper: ShallowWrapper;

	afterAll(() => {
		jest.clearAllMocks();
	});

	it('default order', () => {
		getDate.mockReturnValue('1 мая, пт, 2020 год');

		const order: Order = {
			id: 41,
			date: 1588359900000,
			shop: 'some shop',
			items: ['item1', 'item1'],
		};
		const index = 0;
		wrapper = shallow(<OrderComponent key={index} order={order}/>);
		expect(wrapper).toMatchSnapshot();
	});
	
	it('no items order', () => {
		getDate.mockReturnValue('9 декабря, вс, 2018 год');
		const order: Order = {
			id: 41,
			date: 1544359900000,
			shop: 'some shop',
		};
		const index = 0;
		wrapper = shallow(<OrderComponent key={index} order={order}/>);
		expect(wrapper).toMatchSnapshot();
	});
	
	it('empty order', () => {
		getDate.mockReturnValue('');
		const order: Order = {};
		const index = 0;
		wrapper = shallow(<OrderComponent key={index} order={order}/>);
		expect(wrapper).toMatchSnapshot();
	});
});
