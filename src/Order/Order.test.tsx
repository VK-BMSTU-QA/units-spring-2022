jest.mock('../utils/getDate');import React from 'react';

import {OrderComponent} from '../Order/Order';
import {fakeOrders} from '../data/fakeOrders';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {getDate} from '../utils/getDate';


configure({ adapter: new Adapter() });

describe('Order component', () => {
	beforeEach(() => {
		(getDate as jest.Mock).mockReturnValue('17 марта, чт, 2022 год');
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('render with null items', () => {
		const wrapper = shallow(
			<OrderComponent
				order={fakeOrders[0]}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('render with default order', () => {
		const wrapper = shallow(
			<OrderComponent
				order={fakeOrders[1]}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it.each([
		{id: 1, date: 12, shop: undefined, items: ['1', '2']},
		{id: 1, date: undefined, shop: 'Сбереги Мега Маркер', items: ['1', '2']},
	])('bad case: incomplete object', (order) => {
		const orderComponent = OrderComponent({order: order}); 
		expect(orderComponent).toBeNull();
	});
});
