// import { renderHook } from '@testing-library/react';
// import { waitFor } from '@testing-library/react';
// import * as salesService from '@/services/salesService';
// import {useLoadDishes} from "./useLoadDishes";
//
// jest.mock('@/services/salesService');
//
// const mockDishes = [{ id: 1, name: 'Pizza' }, { id: 2, name: 'Burger' }];
//
// describe('useLoadDishes', () => {
//     beforeEach(() => {
//         (salesService.getDishes as jest.Mock).mockResolvedValue(mockDishes);
//     });
//
//     it('loads dishes on mount', async () => {
//         const { result } = renderHook(() => useLoadDishes());
//
//         await waitFor(() => {
//             expect(result.current.dishes).toEqual(mockDishes);
//         });
//     });
// });
