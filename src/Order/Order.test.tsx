import React from 'react';
import {shallow, configure} from 'enzyme';
import {OrderComponent} from './Order';
import {fakeOrders, Order} from '../data/fakeOrders';
import Adapter from 'enzyme-adapter-react-16';
import {getDate} from '../utils/getDate';

configure({adapter: new Adapter()});
jest.mock('../utils/getDate');

describe('Order.tsx', () => {
	afterEach(() => {
		getDate.mockClear();
	});

	it.each([
		['no items', fakeOrders[0]],
		['items', fakeOrders[1]],
		['one item', {
			id: 126,
			date: 1652585550000,
			shop: 'Эльдоградо',
			items: [
				'Ноутбук Apple MacBook Air 13.3" (MQD32RU/A)',
				'Игровая приставка Sony PlayStation 4 Pro 1TB Black (CUH-7208B)',
			]
		}],
	])('test name: %s', (testName: string, order: Order) => {
		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper).toMatchSnapshot();
		expect(getDate).toHaveBeenCalled();
	});

	it('test name: null data', () => {
		const wrapper = shallow(<OrderComponent order={{data: 0, id: 1}}/>);
		expect(wrapper).toMatchSnapshot();
		expect(getDate).toHaveBeenCalledTimes(0);
	});
});
