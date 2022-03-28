jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';
import React from 'react';
import {OrderComponent, OrderComponentProps} from './Order';
import {sortTypes} from '../utils/sortOrders';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {fakeOrders} from '../data/fakeOrders';


configure({ adapter: new Adapter() });

describe('Order component', () => {
	let wrapper;

	beforeEach(() => {
		(getDate as jest.Mock).mockReturnValue('29 июня, пт, 2001 год');
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('render with shop undefined', () => {
		const order = {
			id: 1,
			shop: undefined,
			date: 123,
			items: [''],
		};
		wrapper = shallow(<OrderComponent key={1} order={order}/>);

		expect(wrapper.getElement()).toBeNull()
	});
	it('render with date undefined', () => {
		const order = {
			id: 1,
			shop: '123',
			date: undefined,
			items: [''],
		};
		wrapper = shallow(<OrderComponent key={1} order={order}/>);

		expect(wrapper.getElement()).toBeNull()
	});
	it('render with order undefined', () => {
		wrapper = shallow(<OrderComponent key={1} order={undefined}/>);

		expect(wrapper.getElement()).toBeNull()
	});
	it('render with items undefined', () => {
		const order = {
			id: 1,
			date: 123,
			shop: '123',
			items: undefined,
		};
		wrapper = shallow(<OrderComponent key={1} order={order}/>);

		expect(wrapper).toMatchSnapshot();
	});
	it('render with empty items', () => {
		wrapper = shallow(<OrderComponent key={1} order={fakeOrders[0]}/>);

		expect(wrapper).toMatchSnapshot();
	});
	it('render with full items', () => {
		wrapper = shallow(<OrderComponent key={1} order={fakeOrders[1]}/>);

		expect(wrapper).toMatchSnapshot();
	});
});