import React from 'react';
import {OrderComponent, OrderComponentProps} from './Order';
import {shallow, ShallowWrapper, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';

configure({ adapter: new Adapter() });


describe('OrderComponent component', () => {
	let wrapper: ShallowWrapper<any, OrderComponentProps>;


	beforeEach(() => {
		getDate.mockReturnValue('XXXdateXXX');
		wrapper = shallow(<OrderComponent order={{}}/>);
	});

	it('null render', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('no items', () => {
		wrapper.setProps({
			order: {
				date: 200,
				shop: 'Lalala',
				items: []
			}
		});

		

		expect(wrapper.text()).toContain('Заказ пуст...');
		expect(wrapper).toMatchSnapshot();

	});

	it('have items', () => {
		wrapper.setProps({
			order: {
				date: 200,
				shop: 'Lalala',
				items: ['1xxx', 'yyy2', 'z3z']
			}
		});


		expect(wrapper.text()).toContain('1xxx');
		expect(wrapper.text()).toContain('yyy2');
		expect(wrapper.text()).toContain('z3z');


		expect(wrapper).toMatchSnapshot();
	});

	it('have shop', () => {
		wrapper.setProps({
			order: {
				date: 200,
				shop: 'Lalala',
				items: ['1xxx', 'yyy2', 'z3z']
			}
		});


		expect(wrapper.text()).toContain('Lalala');

		expect(wrapper).toMatchSnapshot();
	});

	it('have date', () => {
		getDate.mockReturnValue('XXXdateXXX');

		wrapper.setProps({
			order: {
				date: 300,
				shop: 'Lalala',
				items: ['1xxx', 'yyy2', 'z3z']
			}
		});


		expect(wrapper.text()).toContain('XXXdateXXX');

		expect(wrapper).toMatchSnapshot();
	});
});
