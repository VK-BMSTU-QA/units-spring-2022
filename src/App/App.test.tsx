import React from 'react';
import {App} from './App';
import {sortTypes} from '../utils/sortOrders';
import {shallow, configure} from 'enzyme'; // для теста компонентов
import Adapter from 'enzyme-adapter-react-16';

// Тесты на корневой компонент.
// Snapshots нужны как эталоны, а также чтобы понять какое именно место в верстке поплыло
// Снапшоты генерируются при первом запуске.

configure({ adapter: new Adapter() });

describe('App component', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<App/>);  // enzyme эляция рендера компонентов как в index.tsx. С этим приколом потом и работаем.
	});

	it('render with default state DATE', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should render sorted by count', () => {
		// Симулируем нажатие и чекаем соотв. снапшот
		wrapper.find('select').simulate('change', {
			target: {value: sortTypes.COUNT}
		});

		expect(wrapper).toMatchSnapshot();
	});

	it('should render sorted by date after reselect', () => {
		wrapper.find('select').simulate('change', {
			target: {value: sortTypes.COUNT}
		});

		wrapper.find('select').simulate('change', {
			target: {value: sortTypes.DATE}
		});

		// Вернулись в исходное состояние и проверям его..
		expect(wrapper).toMatchSnapshot();
	});
});
