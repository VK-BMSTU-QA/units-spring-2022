import React from 'react';
import {getDate} from '../utils/getDate';
import {fakeOrders} from '../data/fakeOrders';
jest.mock('../utils/getDate');
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {OrderComponent} from './Order';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {
	beforeEach(() => {
		(getDate as jest.Mock).mockReturnValue('17 марта, чт, 2022 год');
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('render order with items', () => {
		const order = fakeOrders[1];
		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('use getDate function while render order with items', () => {
		const order = fakeOrders[1];
		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(getDate).toBeCalled();
	});

	it('render order without items', () => {
		const order = fakeOrders[0];

		const wrapper = shallow(<OrderComponent
			order={order}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('use getDate function while render order without items', () => {
		const order = fakeOrders[0];

		const wrapper = shallow(<OrderComponent
			order={order}/>);
		expect(getDate).toBeCalled();
	});

	test.each([
		{id: 0, date: 0, shop: undefined, items:[]},
		{id: 0, date: undefined, shop: 'TestShop', items:[]},
	])('not render order idf something undefined in order', (order) => {
		const orderComponent = OrderComponent({order: order});
		expect(orderComponent).toBeNull();
	});
});