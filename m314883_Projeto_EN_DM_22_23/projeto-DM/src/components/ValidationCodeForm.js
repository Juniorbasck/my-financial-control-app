import { useState } from 'react';
import {
    Alert,
    View,
    TextInput,
    StyleSheet,
    Pressable,
    Dimensions,
    Text
} from 'react-native';
import { CustomButton } from './CustomButton';
import { Fonts } from '../utils/Fonts';
import { Colors } from '../utils/Colors';
import { 
    checkValidationCode,
    generateValidationCode,
    sendCodeEmail
} from '../../service';

const ValidationCodeForm = ({email, onSuccess}) => {
    const [code1, setCode1] = useState('');
    const [code2, setCode2] = useState('');
    const [code3, setCode3] = useState('');
    const [code4, setCode4] = useState('');

    const [firstInput, setFirstInput] = useState();
    const [secondInput, setSecondInput] = useState();
    const [thirdInput, setThirdInput] = useState();
    const [forthInput, setForthInput] = useState();

    const getCode = () => {
        return code1 + code2 + code3 + code4;
    };

    const cleanCodeInputs = () => {
        setCode1('');
        setCode2('');
        setCode3('');
        setCode4('');
    };

    return (
        <>
            <View style={styles.codeContainer}>
                <TextInput
                    style={[styles.codeInput, Fonts.headlineSmall]}
                    maxLength={1}
                    keyboardType='number-pad'
                    defaultValue={code1}
                    onChangeText={text => {
                            setCode1(text);
                            if (text.length > 0) 
                                secondInput.focus();
                        }
                    }
                    ref={input => setFirstInput(input)}
                    autoFocus={true}
                />
                <TextInput
                    style={[styles.codeInput, Fonts.headlineSmall]}
                    maxLength={1}
                    keyboardType='numeric'
                    defaultValue={code2}
                    onChangeText={text => {
                            setCode2(text);
                            if (text.length > 0)
                                thirdInput.focus();
                        }
                    }
                    ref={input => setSecondInput(input)}
                />
                <TextInput
                    style={[styles.codeInput, Fonts.headlineSmall]}
                    maxLength={1}
                    keyboardType='numeric'
                    defaultValue={code3}
                    onChangeText={text => {
                            setCode3(text);
                            if (text.length > 0)
                                forthInput.focus();
                        }
                    }
                    ref={input => setThirdInput(input)}
                    blurOnSubmit={false}
                />
                <TextInput
                    style={[styles.codeInput, Fonts.headlineSmall]}
                    maxLength={1}
                    keyboardType='numeric'
                    defaultValue={code4}
                    onChangeText={text => {
                            setCode4(text);
                            if (text.length > 0)
                                forthInput.blur();
                        }
                    }
                    ref={input => setForthInput(input)}
                />
            </View>
            <CustomButton
                text={'Verificar'}
                backgroundColor={Colors.tertiaryKeyColor}
                textColor={'white'}
                onPress={() => {
                        if (checkValidationCode(email, getCode())) {
                            Alert.alert(
                                'Validação de Código',
                                'Validação concluída com sucesso!',
                                [
                                    {
                                        text: 'Ok',
                                        onPress: onSuccess
                                    }
                                ]
                            );
                        } else {
                            Alert.alert(
                                'Validação de Código',
                                'Código inválido!', 
                                [
                                    {
                                        text: 'Ok',
                                        onPress: () => {
                                            cleanCodeInputs();
                                            firstInput.focus();
                                        }
                                    }
                                ]
                            );
                        }
                    }
                }
            />
            <View style={styles.regenerateCodeContainer}>
                <Text style={[styles.nothingReceivedText, Fonts.bodyLarge]}>
                    Nada recebeu?
                </Text>
                <Pressable
                    onPress={() => {
                            generateValidationCode(email);
                            sendCodeEmail(email);
                            Alert.alert(
                                'Validação de Código', 
                                `Código reenviado com sucesso para ${email}!`,
                                [
                                    {
                                        text: 'Ok',
                                        onPress: () => {
                                            cleanCodeInputs();
                                            firstInput.focus();
                                        }
                                    }
                                ]
                            );
                        }
                    }
                    style={{marginLeft: '1%'}}
                >
                    <Text style={[{textDecorationLine: 'underline'}, Fonts.bodyLarge]}>Reenviar!</Text>
                </Pressable>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    codeContainer: {
        height: '18%',
        flexDirection: 'row',
        marginTop: '10%'
    },
    codeInput: {
        width: .19 * Dimensions.get('window').width,
        height: .11 * Dimensions.get('window').height,
        margin: '2%',
        padding: '2%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 20,
        textAlign: 'center',
    },
    nothingReceivedText: {
        textAlign: 'right',
        fontWeight: '500'
    },
    regenerateCodeContainer: {
        flexDirection: 'row', 
        alignSelf: 'flex-end', 
        margin: '6%'
    }
});

export { ValidationCodeForm };

