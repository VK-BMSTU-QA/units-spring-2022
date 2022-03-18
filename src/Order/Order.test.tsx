jest.mock('../utils/getDate');
import React from 'react';
import {OrderComponent} from './Order';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {getDate} from '../utils/getDate';
import { fakeOrders } from '../data/fakeOrders';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {
	console.log(getDate);
	beforeEach(() => {
		(getDate as jest.Mock).mockReturnValue('18 марта, чт, 2022 год');
	});

	afterEach(() => {
		jest.clearAllMocks();
	});
	it('Handles null order', () => {
		const order = null;
		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('Renders order with items: null', () => {
		const order = {
			id: 100,
			date: 1647541075867,
			shop: 'МАГАЗИН НА ДИВАНЕ',
			items: null,
		};
		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('Handles incomplete order', () => {
		const order = {
			id: 100,
			items: [],
		};
		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper.getElement()).toBeNull();
	});

	it('Renders empty order', () => {
		const order = fakeOrders[0];
		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('Renders correct order', () => {
		const order = fakeOrders[1];
		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper).toMatchSnapshot();
	});
});