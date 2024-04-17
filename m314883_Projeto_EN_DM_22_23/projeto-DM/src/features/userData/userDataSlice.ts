import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchUserDataAsync, fetchUserDataMock } from '../../../service';

interface UserDataState {
    value: object;
    status: 'idle' | 'loading' | 'failed';
}

const initialState : UserDataState = {
    value: {},
    status: 'idle',
};

export const setUserDataAsync = createAsyncThunk<
    object,
    {state: {userData: UserDataState}}
>('userData/fetchUserData', async () => {
    return await fetchUserDataAsync();
});

export const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserDataMock: state => {
            state.value = fetchUserDataMock();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setUserDataAsync.pending, state => {
            state.status = 'loading';
        })
        .addCase(setUserDataAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.value = action.payload;
        });
    },
});

export const { setUserDataMock } = userDataSlice.actions;
export const selectUserData = (state: RootState) => state.userData;
export default userDataSlice.reducer;
