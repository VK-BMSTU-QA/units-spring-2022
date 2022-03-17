import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { OrderComponent } from './Order';
jest.mock('../utils/getDate');
import { getDate } from '../utils/getDate';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {

	beforeEach(() => {
		(getDate as jest.Mock).mockReturnValue('2022-03-17');
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('render order items', () => {
		const wrapper = shallow(<OrderComponent key={0} order={{
			id: 123,
			date: 1544356800000,
			shop: 'Alihandro Express',
			items: [
				'1',
				'2',
				'3',
			]
		}} />);

		expect(wrapper).toMatchSnapshot();
	});


	it('undefined shop', () => {
		const order = {
			shop: undefined,
			date: 1234,
		};
		const wrapper = shallow(<OrderComponent key={0} order={order} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('render undefined order', () => {
		const wrapper = shallow(<OrderComponent key={0} order={undefined} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('render order undefined date', () => {

		const wrapper = shallow(<OrderComponent key={0} order={{
			date: undefined,
		}} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('render order undefined items', () => {

		const wrapper = shallow(<OrderComponent key={0} order={{
			shop: 'sample shop',
			date: 1234,
			items: undefined,
		}} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('render order without items', () => {
		const wrapper = shallow(<OrderComponent key={0} order={{
			id: 100,
			date: 1588359900000,
			shop: 'Сбереги Мега Маркер',
			items: [],
		}} />);

		expect(wrapper).toMatchSnapshot();
	});


});