import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
    fetchExpensesAsync,
    fetchExpensesMock
} from '../../../service';

interface ExpensesState {
    value: object;
    status: 'idle' | 'loading' | 'failed';
}

const initialState : ExpensesState = {
    value: [],
    status: 'idle',
};

export const setExpensesAsync = createAsyncThunk<
    object,
    {state: {expenses: ExpensesState}}
>('expenses/fetchExpenses', async () => {
    return await fetchExpensesAsync();
});

export const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        setExpensesMock: state => {
            state.value = fetchExpensesMock();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setExpensesAsync.pending, state => {
            state.status = 'loading';
        })
        .addCase(setExpensesAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.value = action.payload;
        });
    },
});

export const { setExpensesMock } = expensesSlice.actions;
export const selectExpenses = (state: RootState) => state.expenses;
export default expensesSlice.reducer;
