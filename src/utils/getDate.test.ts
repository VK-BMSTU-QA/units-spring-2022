import {getDate} from './getDate';

// Небольшой приятный бонус в виде теста на getDate

type GetDateTestData = {
    timestamp: number,
    expected: string,
}

describe('getDate function', () => {
	const table: Array<GetDateTestData> = [
		{timestamp: NaN, expected: ''},
		{timestamp: (new Date('2022-03-13')).getTime(), expected: '13 марта, вс, 2022 год'},
	];
	it.each(table)('getDate($timestamp)', ({timestamp, expected}) => {
		expect(getDate(timestamp)).toBe(expected);
	});
});
