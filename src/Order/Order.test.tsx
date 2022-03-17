import React from 'react';
import {OrderComponent} from './Order';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {
	it('order as null', () => {
		const order = null;
		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('order as different dict', () => {
		const order = {
			id: 100,
			items: [],
		};
		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('order with null items', () => {
		const order = {
			id: 100,
			date: 1588359900000,
			shop: 'Сбереги Мега Маркер',
			items: null,
		};
		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('order with dict items', () => {
		const order = {
			id: 100,
			date: 1588359900000,
			shop: 'Сбереги Мега Маркер',
			items: {
				a: 'b',
			},
		};
		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('order with empty items', () => {
		const order = {
			id: 100,
			date: 1588359900000,
			shop: 'Сбереги Мега Маркер',
			items: [],
		};
		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('order with empty items', () => {
		const order = {
			id: 100,
			date: 1588359900000,
			shop: 'Сбереги Мега Маркер',
			items: [
				'Утиный пластмасса для показ новый год',
				'Курица из нержавеющей стали, утка, гусь, голубь, питьевой фонтан',
				'Новый стиль один розница яйцо для упаковки форма латекс',
			],
		};
		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper).toMatchSnapshot();
	});
});
