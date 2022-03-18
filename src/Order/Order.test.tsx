import React from 'react';
import {OrderComponent} from './Order';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {
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
		const order = {
			id: 1,
			date: 1647541075867,
			shop: 'AZOT',
			items: [],
		};
		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('Renders correct order', () => {
		const order = {
			id: 1,
			date: 1647541075867,
			shop: 'SHOP',
			items: [
				'айфончик',
				'гэлакси телефон'
			],
		};
		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper).toMatchSnapshot();
	});
});