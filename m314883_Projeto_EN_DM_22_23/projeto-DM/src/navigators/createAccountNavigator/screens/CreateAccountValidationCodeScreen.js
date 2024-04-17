import { useState, useEffect } from 'react';
import {
    Alert,
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { Colors } from '../../../utils/Colors';
import { ValidationCodeForm } from '../../../components/ValidationCodeForm';

const CreateAccountValidationCodeScreen = ({route, navigation}) => {
    const { email } = route.params;

    useEffect(() => navigation.addListener('beforeRemove', e => {
        let action = e.data.action;
        if (action.type === 'POP') {
            e.preventDefault();
            Alert.alert(
                'Validação de Código',
                'Ainda não validaste o código. Desejas realmente voltar?',
                [
                    {
                        text: 'Sim',
                        style: 'destructive',
                        onPress: () => navigation.dispatch(e.data.action)
                    }, 
                    {
                        text: 'Não',
                        style: 'cancel',
                        onPress: () => {}
                    }
                ]
            );
        }
    }), [navigation]);

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                keyboardDismissMode='on-drag'
            >
                <ValidationCodeForm
                    email={email}
                    onSuccess={() => {
                            navigation.reset({
                                index: 0,
                                routes: [ { name: 'AppNavigator' } ]
                            });
                        }
                    }
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryKeyColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollView: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        marginTop: '5%',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        backgroundColor: Colors.secondaryKeyColor
    }
});

export { CreateAccountValidationCodeScreen };
