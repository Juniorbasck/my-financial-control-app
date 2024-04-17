import React from 'react';
import 'react-native-gesture-handler';
import { LoginNavigator} from './navigators/loginNavigator/LoginNavigator';
import * as firebase from '../firebase.config.js';

export const App = () => {
    return <LoginNavigator/>;
};
