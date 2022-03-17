import React from 'react';
import { fakeOrders } from '../data/fakeOrders';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {OrderComponent, OrderComponentProps} from './Order';
jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {
	let wrapper;

	beforeEach(() => {
		(getDate as jest.Mock).mockReturnValue('2022-03-17');
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('render undefined order', () => {
		wrapper = shallow(<OrderComponent key={0} order={undefined}/>);

		expect(wrapper).toMatchSnapshot();
	});

	it('render order with undefined shop', () => {
		const order = {
			shop: undefined,
			date: 1234,
		};
		wrapper = shallow(<OrderComponent key={0} order={order}/>);

		expect(wrapper).toMatchSnapshot();
	});

	it('render order with undefined date', () => {
		const order = {
			shop: 'test',
			date: undefined,
		};
		wrapper = shallow(<OrderComponent key={0} order={order}/>);

		expect(wrapper).toMatchSnapshot();
	});

	it('render order with undefined items', () => {
		const order = {
			shop: 'test',
			date: 1234,
			items: undefined,
		};
		wrapper = shallow(<OrderComponent key={0} order={order}/>);

		expect(wrapper).toMatchSnapshot();
	});

	it('render order with empty items', () => {
		wrapper = shallow(<OrderComponent key={0} order={fakeOrders[0]}/>);

		expect(wrapper).toMatchSnapshot();
	});

	it('render order with items', () => {
		wrapper = shallow(<OrderComponent key={0} order={fakeOrders[1]}/>);

		expect(wrapper).toMatchSnapshot();
	});
});
