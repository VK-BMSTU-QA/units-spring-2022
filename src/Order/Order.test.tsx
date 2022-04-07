jest.mock('../utils/getDate');
import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {OrderComponent} from './Order';
import {getDate} from '../utils/getDate';

configure({ adapter: new Adapter() });


describe('Order component test', () => {

	const testData = [
		{
			date: 2,			// base usega
			id: 3,
			items: ['d', 'k'],
			shop: 'dore',
		},
		{
			date: 2,			// without items
			id: 3,
			items: [],
			shop: 'dore',
		},
		{
			date: 2,			// without id
			items: ['d', 'k'],
			shop: 'dore',
		}
	];

	beforeEach(() => {
		(getDate as jest.Mock).mockReturnValue('2 апреля 2022 год');
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('without items', () => {
		const wrapper = shallow(<OrderComponent order={testData[1]} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('call getDate', () => {
		shallow(<OrderComponent order={testData[0]} />);

		expect(getDate).toHaveBeenCalledTimes(1);
	});

	it('without id', () => {
		const wrapper = shallow(<OrderComponent order={testData[2]} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('with items', () => {
		const wrapper = shallow(<OrderComponent order={testData[0]} />);

		expect(wrapper).toMatchSnapshot();
	});

	it.each([
		{
			id: 3,
			date: 2,
			items: ['d', 'k'],
		},
		{
			id: 3,
			items: ['d', 'k'],
			shop: 'dore',
		}
	])('with null element', (data) => {
		const wrapper = shallow(<OrderComponent order={data} />);

		expect(wrapper.getElement()).toBeNull();
	});
});
