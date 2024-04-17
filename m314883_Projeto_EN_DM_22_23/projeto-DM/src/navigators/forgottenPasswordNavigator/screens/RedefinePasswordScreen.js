import { useState, useEffect } from 'react';
import {
    Alert,
    View,
    ScrollView,
    StyleSheet,
    Text,
    Dimensions
} from 'react-native';
import { Colors } from '../../../utils/Colors';
import { Fonts } from '../../../utils/Fonts';
import { PasswordInput } from '../../../components/PasswordInput';
import { CustomButton } from '../../../components/CustomButton';
import { validatePassword } from '../../../utils/Validator';

const RedefinePasswordScreen = ({navigation}) => {
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [avoidUseEffect, setAvoidUseEffect] = useState(false);

    const [newPasswordInput, setNewPasswordInput] = useState();
    const [repeatPasswordInput, setRepeatPasswordInput] = useState();

    useEffect(() => navigation.addListener('beforeRemove', e => {
        let action = e.data.action;
        if (!avoidUseEffect) {
            e.preventDefault();
            Alert.alert(
                'Redefinir Palavra-Passe',
                'A palavra-passe ainda não foi alterada. Desejas realmente voltar?',
                [
                    {
                        text: 'Sim',
                        style: 'destructive',
                        onPress: () => navigation.dispatch(action)
                    }, 
                    {
                        text: 'Não',
                        style: 'cancel',
                        onPress: () => {}
                    }
                ]
            );
        }
    }), [navigation, avoidUseEffect]);

    return (
        <View style={styles.container}>
            <ScrollView
                keyboardDismissMode='on-drag'
                contentContainerStyle={styles.scrollView}
            >
                <Text style={[styles.typePassword, Fonts.bodyLarge, { marginTop: '15%' }]}>Digite a nova palavra-passe</Text>
                <PasswordInput
                    state={newPassword}
                    setState={setNewPassword}
                    marginTopPercentage={2}
                    marginBottomPercentage={2}
                    placeholder='Nova palavra-passe'
                    autofocus={true}
                    setRef={setNewPasswordInput}
                    onSubmitEditing={() => repeatPasswordInput.focus()}
                    blurOnSubmit={false}
                />
                <Text style={[styles.typePassword, Fonts.bodyLarge]}>Repita a nova palavra-passe</Text>
                <PasswordInput
                    state={repeatPassword}
                    setState={setRepeatPassword}
                    marginTopPercentage={2}
                    marginBottomPercentage={2}
                    placeholder='Repita nova palavra-passe'
                    setRef={setRepeatPasswordInput}
                />
                <CustomButton
                    text={'Guardar'}
                    backgroundColor={Colors.tertiaryKeyColor}
                    textColor={'white'}
                    onPress={() => {
                        if (validatePassword(newPassword)) {
                            if (newPassword == repeatPassword) {
                                setAvoidUseEffect(true);
                                Alert.alert(
                                    'Mudança de Palavra-Passe', 
                                    'Sua palavra-passe foi atualizada com sucesso. Lembre-se de anotá-la em algum lugar para não esquecer!',
                                    [
                                        {
                                            text: 'Ok',
                                            onPress: () => {
                                                Alert.alert(
                                                    'Realizar Login',
                                                    'Desejas fazer login?',
                                                    [
                                                        {
                                                            text: 'Sim',
                                                            onPress: () => navigation.reset({
                                                                index: 0,
                                                                routes: [{ name: 'AppNavigator' }]
                                                            })
                                                        },
                                                        {
                                                            text: 'Não',
                                                            style: 'cancel',
                                                            onPress: () => navigation.goBack()
                                                        }
                                                    ]
                                                );
                                            }
                                        }
                                    ]
                                );
                            } else {
                                Alert.alert('Mudança de Palavra-Passe', 'Ambas as senhas devem ser iguais!');
                            }
                        } else {
                            Alert.alert('Mudança de Palavra-Passe', 'A palavra-passe deve ter no mínimo 6 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 caracter especial!');
                        }
                    }}
                    widthPercentage={50}
                />
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryKeyColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerContainer: {
        alignSelf: 'flex-start', 
        marginLeft: '3.5%'
    },
    scrollView: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        marginTop: '5%',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        backgroundColor: Colors.secondaryKeyColor
    },
    typePassword: {
        alignSelf: 'flex-start',
        marginHorizontal: '5%',
    }
});

export { RedefinePasswordScreen };
