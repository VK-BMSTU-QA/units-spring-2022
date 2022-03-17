import React from 'react';
import 'jest';
import {shallow, configure} from 'enzyme';
import {OrderComponent} from './Order';
import {fakeOrders} from '../data/fakeOrders';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const mocGetData: jest.Mock = jest.fn()
	.mockReturnValue('aa')
	.mockReturnValue('bb')
	.mockReturnValue('cc');

describe('Order.tsx', () => {
	let wrapper;

	it('simple (Сбереги Мега Маркер)', () => {
		wrapper = shallow(<OrderComponent order={fakeOrders[0]}/>);
		expect(wrapper).toMatchSnapshot();
	});
});
