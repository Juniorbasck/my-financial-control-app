import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ExpenseScreen } from './screens/ExpenseScreen';
import { EditExpenseScreen } from './screens/EditExpenseScreen';
import { CreateExpenseScreen } from './screens/CreateExpenseScreen';

const Stack = createStackNavigator();

const ExpenseNavigator = ({route}) => {
    return (
        <Stack.Navigator
            initialRouteName={'Expense'}
        >
            <Stack.Screen 
                name={'Expense'} 
                component={ExpenseScreen} 
                options={{headerShown: true, headerTitle: 'Despesas'}}
                initialParams={route.params}
            />
            <Stack.Screen 
                name={'EditExpense'} 
                component={EditExpenseScreen} 
                options={{headerShown: true, headerTitle: 'Editar Despesa', headerTitleAlign: 'center'}}
            />
            <Stack.Screen 
                name={'CreateExpense'}
                component={CreateExpenseScreen}
                options={{headerShown: true, headerTitle: 'Criar Despesa', headerTitleAlign: 'center'}}
            />
        </Stack.Navigator>
    );
}

export { ExpenseNavigator };
