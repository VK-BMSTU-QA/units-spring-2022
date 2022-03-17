import React from 'react';
import {OrderComponent} from './Order';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

jest.mock('../utils/getDate');
import { getDate } from '../utils/getDate';
import {fakeOrders} from '../data/fakeOrders';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {

	beforeEach(() => {
		getDate.mockReturnValue('date');
	});

	afterAll(() => {
		jest.resetModules();
	});

	it('order as null', () => {
		const wrapper = shallow(<OrderComponent order={null}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('order as invalid obj', () => {
		const order = {
			id: 100,
			items: [],
		};
		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper.getElement()).toBeNull();
	});

	it('order with null items', () => {
		const wrapper = shallow(<OrderComponent order={{...fakeOrders[0], items: []}}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('order with invalid items obj', () => {
		const wrapper = shallow(<OrderComponent order={{...fakeOrders[0], items: [{a: 'b'}]}}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('order with empty items', () => {
		const wrapper = shallow(<OrderComponent order={fakeOrders[0]}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('order with empty items', () => {
		const wrapper = shallow(<OrderComponent order={fakeOrders[1]}/>);
		expect(wrapper).toMatchSnapshot();
	});
});
