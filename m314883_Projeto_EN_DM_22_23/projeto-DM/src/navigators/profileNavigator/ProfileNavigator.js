import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from './screens/ProfileScreen';
import { ProfileDetailsScreen } from './screens/ProfileDetailsScreen';
import { HistoricScreen } from './screens/HistoricScreen';
import { ChangePasswordScreen } from './screens/ChangePasswordScreen';

const Stack = createStackNavigator();

const ProfileNavigator = ({route}) => {
    return (
        <Stack.Navigator
            initialRouteName={'Profile'}
        >
            <Stack.Screen 
                name={'Profile'} 
                component={ProfileScreen} 
                options={{headerShown: true, headerTitle: 'Perfil'}}
                initialParams={route.params}
            />
            <Stack.Screen 
                name={'ProfileDetails'} 
                component={ProfileDetailsScreen} 
                options={{headerShown: true, headerTitle: 'Detalhes da Conta', headerTitleAlign: 'center'}}
            />
            <Stack.Screen 
                name={'Historic'} 
                component={HistoricScreen} 
                options={{headerShown: true, headerTitle: 'Histórico', headerTitleAlign: 'center'}}
            />
            <Stack.Screen 
                name={'ChangePassword'} 
                component={ChangePasswordScreen} 
                options={{headerShown: true, headerTitle: 'Alterar Palavra-Passe', headerTitleAlign: 'center'}}
            />            
        </Stack.Navigator>
    );
}

export { ProfileNavigator };
