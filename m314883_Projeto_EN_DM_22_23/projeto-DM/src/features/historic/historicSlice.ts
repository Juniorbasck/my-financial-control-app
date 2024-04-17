import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchHistoricAsync, fetchHistoricMock } from '../../../service';
import expensesSlice from '../expenses/expensesSlice';

interface HistoricState {
    value: object;
    status: 'idle' | 'loading' | 'failed';
}

const initialState : HistoricState = {
    value: [],
    status: 'idle',
};

export const setHistoricAsync = createAsyncThunk<
    object,
    {state: {historic: HistoricState}}
>('historic/fetchHistoric', async () => {
    return await fetchHistoricAsync();
});

export const historicSlice = createSlice({
    name: 'historic',
    initialState,
    reducers: {
        setHistoricMock: state => {
            state.value = fetchHistoricMock();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setHistoricAsync.pending, state => {
            state.status = 'loading';
        })
        .addCase(setHistoricAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.value = action.payload;
        });
    },
});

export const { setHistoricMock } = historicSlice.actions;
export const selectHistoric = (state: RootState) => state.historic;
export default historicSlice.reducer;
