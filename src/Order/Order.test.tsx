jest.mock('../utils/getDate');
import React from 'react';
import {configure, mount, render, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {OrderComponent} from './Order';
import {getDate} from '../utils/getDate';

configure({ adapter: new Adapter() });

beforeEach(() => {
	(getDate as jest.Mock).mockReturnValue('2 апреля 2022 год');
});

afterEach(() => {
	jest.clearAllMocks();
});

describe.each([ [{
	date: 2,
	id: 3,
	items: ['d', 'k'],
	shop: 'dore',
}, 'with items'],
[{
	date: 2,
	id: 3,
	items: [],
	shop: 'dore',
}, 'without items'],
[{
	date: 2,
	items: ['d', 'k'],
	shop: 'dore',
}, 'no id'],
]) ( 'with call getDate', (a, type: string)=> {

	it(type + ' : shallow', () => {
		const wrapper = shallow(<OrderComponent order={a}/>);

		expect(getDate).toBeCalledTimes(1);
		expect(getDate).toBeCalledWith(a.date);
		expect(wrapper).toMatchSnapshot();
	});

	it(type + ' : mount', () => {
		const wrapper = mount(<OrderComponent order={a}/>);

		expect(getDate).toBeCalledTimes(1);
		expect(getDate).toBeCalledWith(a.date);
		expect(wrapper).toMatchSnapshot();
	});

	it(type + ' : render', () => {
		const wrapper = render(<OrderComponent order={a}/>);

		expect(getDate).toBeCalledTimes(1);
		expect(getDate).toBeCalledWith(a.date);
		expect(wrapper).toMatchSnapshot();
	});
});

describe.each([
	[{
		id: 3,
		items: ['d', 'k'],
		shop: 'dore',
	}, 'no date'],
	[{
		id: 3,
		date: 2,
		items: ['d', 'k'],
	}, 'no shop'],
]) ( 'without call getDate', (a, type: string)=> {

	it(type + ' : shallow', () => {
		const wrapper = shallow(<OrderComponent order={a}/>);

		expect(getDate).toBeCalledTimes(0);
		expect(wrapper).toMatchSnapshot();
	});

	it(type + ' : mount', () => {
		const wrapper = mount(<OrderComponent order={a}/>);

		expect(wrapper).toMatchSnapshot();
	});

	it(type + ' : render', () => {
		const wrapper = render(<OrderComponent order={a}/>);

		expect(getDate).toBeCalledTimes(0);
		expect(wrapper).toMatchSnapshot();
	});
});
