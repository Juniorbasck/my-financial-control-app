import React, { useState } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import { CustomButton } from '../../../components/CustomButton';
import { CustomTextInput } from '../../../components/CustomTextInput';
import { Colors } from '../../../utils/Colors';
import { Fonts } from '../../../utils/Fonts';
import { ResponsiveDimensions } from '../../../utils/ResponsiveDimensions';
import { validateEmail } from '../../../utils/Validator';
import { emailExistsOnApp } from '../../../../service';
import { StackActions } from '@react-navigation/native';
import { OkAlert } from '../../../components/OkAlert';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const ForgottenPasswordScreen = ({navigation}) => {
    const [email, setEmail] = useState('');

    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);

    const [emailInput, setEmailInput] = useState();

    return (
        <View style={styles.outerContainer}>
            <ScrollView 
                keyboardDismissMode={'on-drag'}
                contentContainerStyle={styles.scrollView}
            >
                <View style={styles.marginPaddingDefault}>
                    <Text style={[styles.title, Fonts.displaySmall]}>Esqueceu Palavra-Passe</Text>
                </View>
                <View style={styles.marginPaddingDefault}>
                    <Image
                        source={require('../../../../assets/difficulties.png')}
                        resizeMode={'contain'}
                        style={styles.image}
                    />
                </View>
                <View style={styles.marginPaddingDefault}>
                    <Text style={[styles.subtitle, Fonts.bodyLarge]}>Indique o seu e-mail para receber as instruções para recuperar a palavra-passe</Text>
                </View>
                <CustomTextInput
                    placeholder={'E-mail'}
                    keyboardType={'email-address'}
                    widthPercentage={90}
                    state={email}
                    setState={setEmail}
                    setRef={setEmailInput}
                    autofocus={true}
                />
                <View style={styles.marginPaddingDefault}>
                    <CustomButton
                        text={'Enviar'}
                        textColor={Colors.onPrimaryKeyColor}
                        onPress={async () => {
                            if (validateEmail(email)) {
                                if (await emailExistsOnApp(email)) {
                                    let actionCodeSettings = {
                                        handleCodeInApp: true,
                                        url: 'https://meu-controlo-financeiro.firebaseapp.com'
                                    };
                                    try {
                                        await sendPasswordResetEmail(getAuth(), email, actionCodeSettings);
                                        setSuccessAlertVisible(true);
                                    } catch (err) {
                                        console.log('Error when trying to send password reset email -----');
                                        console.log(err.message);
                                        setErrorAlertVisible(true);
                                    }
                                } else 
                                    setErrorAlertVisible(true);
                            } else
                                setErrorAlertVisible(true);
                        }}
                        backgroundColor={Colors.tertiaryKeyColor}
                        widthPercentage={90}
                    />
                </View>
            </ScrollView>
            <OkAlert
                visible={errorAlertVisible}
                setVisible={setErrorAlertVisible}
                title={'Recuperação de Palavra-Passe'}
                description={'O e-mail digitado é inválido!'}
                onPressOk={() => {
                    setTimeout(() => {
                        setEmail('');
                        emailInput.focus();
                    }, 100);
                }}
            />
            <OkAlert
                visible={successAlertVisible}
                setVisible={setSuccessAlertVisible}
                title={'Recuperação de Palavra-Passe'}
                description={`Clique no link enviado para ${email} para redefinir a palavra-passe`}
                onPressOk={() => navigation.goBack()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: Colors.primaryKeyColor
    },
    scrollView: {
        height: ResponsiveDimensions.screen.height,
        width: ResponsiveDimensions.screen.width,
        marginTop: ResponsiveDimensions.screen.defaultMarginTop,
        alignItems: 'center',
    },
    marginPaddingDefault: {
        margin: '2%',
        padding: '2%'
    },
    title: {
        color: Colors.onPrimaryKeyColor,
        textAlign: 'center'
    },
    image: {
        width: ResponsiveDimensions.smallSquareImageContainer.width,
        height: ResponsiveDimensions.smallSquareImageContainer.height
    },
    subtitle: {
        color: Colors.onPrimaryKeyColor,
        textAlign: 'center'
    }
});

export { ForgottenPasswordScreen };
