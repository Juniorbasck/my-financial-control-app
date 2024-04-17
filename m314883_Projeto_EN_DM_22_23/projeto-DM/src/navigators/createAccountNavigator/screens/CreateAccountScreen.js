import { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    Alert,
    Dimensions
} from 'react-native';
import { Colors } from '../../../utils/Colors';
import { CustomTextInput } from '../../../components/CustomTextInput';
import { TermsAndConditions } from '../../../components/TermsAndConditions'; 
import { CustomButton } from '../../../components/CustomButton';
import { 
    validateEmail, 
    validatePassword, 
    validateTextField 
} from '../../../utils/Validator';
import { PasswordInput } from '../../../components/PasswordInput';
import { StackActions } from '@react-navigation/native';
import {
    createNewUserAsync,
    emailNotTaken,
    usernameNotTaken
} from '../../../../service';
import { OkAlert } from '../../../components/OkAlert';
import { YesNoAlert } from '../../../components/YesNoAlert';
import {
    createUserWithEmailAndPassword, 
    getAuth,
    sendEmailVerification
} from 'firebase/auth';

async function validateData(name, surname, username, email, password, confirmPassword) {
    let message = {};
    if (validateTextField(name) && validateTextField(surname) && validateTextField(username)) {
        if (validateEmail(email)) {
            if (await emailNotTaken(email)) {
                if (await usernameNotTaken(username)) {
                    if (validatePassword(password)) {
                        if (password === confirmPassword) {
                            message.header = 'Validação de E-mail';
                            message.body = `Um e-mail contendo um link para validação foi enviado com sucesso para ${email}!`;
                        } else {
                            message.header = 'Palavra-passe e Confirmação';
                            message.body = 'A palavra passe e confirmação da palavra-passe diferem!';
                        }
                    } else {
                        message.header = 'Palavra-Passe';
                        message.body = 'A palavra-passe deve ter no mínimo 6 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 caracter especial!';
                    }
                } else {
                    message.header = 'Nome de Utilizador Repetido';
                    message.body = 'Nome de Utilizador já está em uso!';
                }
            } else {
                message.header = 'E-mail Repetido';
                message.body = 'E-mail já está em uso!';
            }
        } else {
            message.header = 'Formato do E-mail';
            message.body = 'E-mail com formato inválido!';
        }
    } else {
        message.header = 'Campo de Texto';
        message.body = 'Campo de texto inválido!';
    }
    return message;
}

const CreateAccountScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checked, setChecked] = useState(false);

    const [nameInput, setNameInput] = useState();
    const [surnameInput, setSurnameInput] = useState();
    const [usernameInput, setUsernameInput] = useState();
    const [emailInput, setEmailInput] = useState();
    const [passwordInput, setPasswordInput] = useState();
    const [confirmPasswordInput, setConfirmPasswordInput] = useState();

    const [avoidUseEffect, setAvoidUseEffect] = useState(false);

    const [errorOkAlertVisible, setErrorOkAlertVisible] = useState(false);
    const [errorOkAlertTitle, setErrorOkAlertTitle] = useState('');
    const [errorOkAlertDescription, setErrorOkAlertDescription] = useState('');

    const [successOkAlertVisible, setSuccessOkAlertVisible] = useState(false);
    const [successOkAlertTitle, setSuccessOkAlertTitle] = useState('');
    const [successOkAlertDescription, setSuccessOkAlertDescription] = useState('');

    const [yesNoAlertVisible, setYesNoAlertVisible] = useState(false);
    const [action, setAction] = useState();

    useEffect(() => navigation.addListener('beforeRemove', e => {
        let action = e.data.action;
        if (!avoidUseEffect) {
            e.preventDefault();
            setAction(action);
            setYesNoAlertVisible(true);
        }
    }), [navigation, avoidUseEffect]);

    return (
        <View style={styles.outerContainer}>
            <ScrollView 
                keyboardDismissMode={'on-drag'}
                contentContainerStyle={styles.scrollView}
            >
                <View style={styles.nameSurnameContainer}>
                    <CustomTextInput
                        placeholder={'Nome'}
                        state={name}
                        setState={setName}
                        autofocus={true}
                        setRef={setNameInput}
                        onSubmitEditing={() => surnameInput.focus()}
                        blurOnSubmit={false}
                    />
                    <CustomTextInput
                        placeholder='Apelido'
                        state={surname}
                        setState={setSurname}
                        setRef={setSurnameInput}
                        onSubmitEditing={() => usernameInput.focus()}
                        blurOnSubmit={false}
                    />                    
                </View>
                <CustomTextInput
                    placeholder={'Nome de utilizador'}
                    widthPercentage={90}
                    state={username}
                    setState={setUsername}
                    marginBottomPercentage={3}
                    setRef={setUsernameInput}
                    onSubmitEditing={() => emailInput.focus()}
                    blurOnSubmit={false}
                />
                <CustomTextInput
                    placeholder={'E-mail'}
                    widthPercentage={90}
                    state={email}
                    setState={setEmail}
                    keyboardType={'email-address'}
                    marginBottomPercentage={5}
                    setRef={setEmailInput}
                    onSubmitEditing={() => passwordInput.focus()}
                    blurOnSubmit={false}
                />
                <PasswordInput
                    state={password}
                    setState={setPassword}
                    widthPercentage={90}
                    marginBottomPercentage={5}
                    setRef={setPasswordInput}
                    onSubmitEditing={() => confirmPasswordInput.focus()}
                    blurOnSubmit={false}
                />
                <PasswordInput
                    state={confirmPassword}
                    setState={setConfirmPassword}
                    widthPercentage={90}
                    marginBottomPercentage={5}
                    placeholder='Confirmar palavra-passe'
                    setRef={setConfirmPasswordInput}
                />
                <TermsAndConditions
                    state={checked}
                    setState={setChecked}
                />
                <View style={{marginTop: '10%'}}>
                    <CustomButton
                        text={'Criar'}
                        onPress={async () => {
                            let res = await validateData(name, surname, username, email, password, confirmPassword);
                            if (res.header == 'Validação de E-mail') {
                                setAvoidUseEffect(true);
                                let auth = getAuth();
                                await createUserWithEmailAndPassword(auth, email, password)
                                .then(_ => {
                                    sendEmailVerification(
                                        auth.currentUser, {
                                        handleCodeInApp: true,
                                        url: 'https://meu-controlo-financeiro.firebaseapp.com'
                                    }).then(async _ => {
                                        await createNewUserAsync(name, surname, username, email);
                                        setSuccessOkAlertTitle(res.header);
                                        setSuccessOkAlertDescription(res.body);
                                        setSuccessOkAlertVisible(true);
                                    });
                                }).catch(err => {
                                    setErrorOkAlertTitle('Erro ao Tentar Criar Conta');
                                    setErrorOkAlertDescription(err.message);
                                    setErrorOkAlertVisible(true);
                                });
                            } else {
                                setErrorOkAlertTitle(res.header);
                                setErrorOkAlertDescription(res.body);
                                setErrorOkAlertVisible(true);
                            }
                        }}
                        backgroundColor={checked ? Colors.tertiaryKeyColor : Colors.tertiaryKeyColorDisabled}
                        textColor={Colors.onPrimaryKeyColor}
                        widthPercentage={95}
                        disabled={!checked}
                    />
                </View>
            </ScrollView>
            <OkAlert
                visible={errorOkAlertVisible}
                setVisible={setErrorOkAlertVisible}
                title={errorOkAlertTitle}
                description={errorOkAlertDescription}
            />
            <OkAlert
                visible={successOkAlertVisible}
                setVisible={setSuccessOkAlertVisible}
                title={successOkAlertTitle}
                description={successOkAlertDescription}
                onPressOk={() => navigation.goBack()}
            />
            <YesNoAlert
                visible={yesNoAlertVisible}
                setVisible={setYesNoAlertVisible}
                title={'Criação de Conta'}
                description={'Se voltares os dados serão perdidos. Desejas realmente fazer isso?'}
                onPressYes={() => navigation.dispatch(action)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryKeyColor,
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
    nameSurnameContainer: {
        flexDirection: 'row', 
        marginTop: '10%',
        marginBottom: '2%'
    }
});

export { CreateAccountScreen };
