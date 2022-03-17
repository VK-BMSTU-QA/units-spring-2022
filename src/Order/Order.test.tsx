import React from 'react';
import {OrderComponent} from './Order';
import {shallow, configure} from 'enzyme';
import {fakeOrders} from '../data/fakeOrders';
import Adapter from 'enzyme-adapter-react-16';

jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {
	beforeEach(() => {
		(getDate as jest.Mock).mockReturnValue('some string');
	});

	afterAll(() => {
		jest.resetModules();
	});

	it('getDate called', () => {
		shallow(<OrderComponent order={fakeOrders[0]} />);

		expect(getDate).toHaveBeenCalledTimes(1);
	});

	it('no items', () => {
		const wrapper = shallow(<OrderComponent order={fakeOrders[0]} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('there are items in order', () => {
		const wrapper = shallow(<OrderComponent order={fakeOrders[1]} />);

		expect(wrapper).toMatchSnapshot();
	});

	it.each([
		{
			date: 12,
		},
		{
			shop: 'shop',
		}
	])('returns null', (data) => {
		const wrapper = shallow(<OrderComponent order={data} />);

		expect(wrapper.getElement()).toBeNull();
	});
});
