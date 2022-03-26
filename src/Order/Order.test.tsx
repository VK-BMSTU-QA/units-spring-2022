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

	beforeEach(() => {
		getDate.mockReturnValue('1 мая, пт, 2020 год');
	});

	it('Default order: snapshot match', () => {
		const order: Order = {
			id: 41,
			date: 1588359900000,
			shop: 'some shop',
			items: ['item1', 'item1'],
		};
		wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper).toMatchSnapshot();
	});
	
	it('Default order: getDate call', () => {
		const order: Order = {
			id: 41,
			date: 1588359900000,
			shop: 'some shop',
			items: ['item1', 'item1'],
		};
		wrapper = shallow(<OrderComponent order={order}/>);
		expect(getDate).toBeCalledTimes(1);
	});

	it('Order with no items: snapshot match', () => {
		const order: Order = {
			id: 41,
			date: 1588359900000,
			shop: 'some shop',
		};
		wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper).toMatchSnapshot();
	});
	
	it('Order with no items: getDate call', () => {
		const order: Order = {
			id: 41,
			date: 1588359900000,
			shop: 'some shop',
		};
		wrapper = shallow(<OrderComponent order={order}/>);
		expect(getDate).toBeCalledTimes(1);
	});

	it('Empty order: null element', () => {
		const order: Order = {};
		wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper.getElement()).toBeNull();
	});

	it('Empty order: getDate call', () => {
		const order: Order = {};
		wrapper = shallow(<OrderComponent order={order}/>);
		expect(getDate).toBeCalledTimes(0);
	});
});
