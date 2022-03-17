import React from 'react';
import {OrderComponent} from './Order';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {
	it('all info', () => {
		const someOrder = {
			id: 123,
			date: 1544356800000,
			shop: 'Alihandro Express',
			items: [
				'Утиный пластмасса для показ новый год',
				'Курица из нержавеющей стали, утка, гусь, голубь, питьевой фонтан',
				'Новый стиль один розница яйцо для упаковки форма латекс',
			]
		};
		const wrapper = shallow(<OrderComponent order={someOrder}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('bad order info', () => {
		const someOrder = {
			id: 123,
			date: 1544356800000,
			items: [
				'Утиный пластмасса для показ новый год',
				'Курица из нержавеющей стали, утка, гусь, голубь, питьевой фонтан',
				'Новый стиль один розница яйцо для упаковки форма латекс',
			]
		};
		const wrapper = shallow(<OrderComponent order={someOrder}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('empty item list', () => {
		const someOrder = {
			id: 123,
			date: 1544356800000,
			shop: 'Alihandro Express',
			items: []
		};
		const wrapper = shallow(<OrderComponent order={someOrder}/>);
		expect(wrapper).toMatchSnapshot();
	});
});
