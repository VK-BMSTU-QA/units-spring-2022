jest.mock('../utils/getDate');
import { OrderComponent } from './Order';
import {getDate} from "../utils/getDate"

describe('Order.tsx', () => {
	describe('Order.tsx', () => {
		beforeEach(() => {
			(getDate as jest.Mock).mockReturnValue('23 февраля, ср, 2022 год');
		});
	
		afterEach(() => {
			jest.clearAllMocks();
		});
	
		test.each([
			{
				date: 5,
				shop: undefined, 
				items:[]
			},
			{
				date: undefined, 
				shop: 'amazon', 
				items:[1, 2]
			},
		])('OrderComponent({order: %s})', (order) => {
			const orderComponent = OrderComponent({order: order}); 
			expect(orderComponent).toBeNull();
		});
	
		
	});
});
