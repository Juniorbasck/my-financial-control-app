import {
    configureStore,
    ThunkAction,
    Action
} from '@reduxjs/toolkit';
import userDataReducer from '../features/userData/userDataSlice';
import expensesReducer from '../features/expenses/expensesSlice';
import historicReducer from '../features/historic/historicSlice';

export const store = configureStore({
    reducer: {
        userData: userDataReducer,
        expenses: expensesReducer,
        historic: historicReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<String>
>;
