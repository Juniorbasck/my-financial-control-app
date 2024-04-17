import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
} from 'react-native';
import { Colors } from '../../../utils/Colors';
import { CustomTextInput } from '../../../components/CustomTextInput';
import { CustomButton } from '../../../components/CustomButton';
import { YesNoAlert } from '../../../components/YesNoAlert';
import { OkAlert } from '../../../components/OkAlert';
import { ProfilePicture } from '../../../components/ProfilePicture';
import { Snackbar } from 'react-native-paper';
import { PickImageModal } from '../../../components/PickImageModal';
import { updateUserAsync } from '../../../../service';
import {
    useAppSelector,
    useAppDispatch
} from '../../../app/hooks';
import {
    selectUserData,
    setUserDataAsync
} from '../../../features/userData/userDataSlice';

function validate(name, surname, username) {
    return name.length > 0 && surname.length > 0 && username.length > 0;
}

function dataChanged(userData, name, surname, username, image) {
    return userData.value.name != name || userData.value.surname != surname || userData.value.username != username || userData.value.image != image;
}

const ProfileDetailsScreen = ({route, navigation}) => {
    const userData = useAppSelector(selectUserData);
    const status = useAppSelector(state => state.userData.status);

    const dispatch = useAppDispatch();

    const [name, setName] = useState(userData.value.name);
    const [surname, setSurname] = useState(userData.value.surname);
    const [username, setUsername] = useState(userData.value.username);
    const [email, setEmail] = useState(userData.value.email);
    const [image, setImage] = useState(userData.value.image);

    const [modalVisible, setModalVisible] = useState(false);
    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [updateDataAlertVisible, setUpdateDataAlertVisible] = useState(false);
    const [invalidDataAlertVisible, setInvalidDataAlertVisible] = useState(false);

    const [nameInput, setNameInput] = useState();
    const [surnameInput, setSurnameInput] = useState();
    const [usernameInput, setUsernameInput] = useState();

    const [action, setAction] = useState({});
    const [invalidDataMsg, setInvalidDataMsg] = useState('');

    const update = async () => {
        let localName = name.trim(), localUsername = username.trim(), localSurname = surname.trim();
        if (validate(localName, localSurname, localUsername)) {
            if (dataChanged(userData, localName, localSurname, localUsername, image)) {
                let newUserData = {
                    name: name,
                    surname: surname,
                    username: username,
                    image: image
                };
                try {
                    await updateUserAsync(newUserData);
                    dispatch(setUserDataAsync());
                } catch (err) {
                    setUpdateDataAlertVisible(false);
                    setInvalidDataMsg(err.message);
                    setInvalidDataAlertVisible(true);
                    return false;
                } 
            }
            return true;
        } else {
            setUpdateDataAlertVisible(false);
            setInvalidDataMsg('Preencha os campos de nome, apelido e nome de utilizador corretamente');
            setInvalidDataAlertVisible(true);
            return false;
        }
    };

    useEffect(() => {
        dispatch(setUserDataAsync());
    }, []);

    useEffect(() => {
        navigation.addListener('beforeRemove', e => {
            if (e.data.action.type === 'POP' && dataChanged(userData, name, surname, username, image)) {
                e.preventDefault();
                setAction(e.data.action);
                setUpdateDataAlertVisible(true);
            }
        });
    }, [navigation, name, surname, username, image]);

    return (
        <View style={styles.outerContainer}>
            <ScrollView 
                contentContainerStyle={
                    [
                        styles.scrollView, 
                        image ? {
                            height: 1.3 * Dimensions.get('window').height
                        } : {
                            height: Dimensions.get('window').height
                        }
                    ]
                }
                keyboardDismissMode='on-drag'
            >   
                <View style={{marginTop: '5%'}}>
                    <ProfilePicture
                        onPress={() => setModalVisible(true)}
                        size='big'
                        src={image}
                    />
                </View>
                <CustomTextInput
                    state={name}
                    setState={setName}
                    placeholder='Nome'
                    widthPercentage={90}
                    marginTopPercentage={5}
                    autofocus={true}
                    setRef={setNameInput}
                    onSubmitEditing={() => surnameInput.focus()}
                    blurOnSubmit={false}
                />
                <CustomTextInput
                    state={surname}
                    setState={setSurname}
                    placeholder='Apelido'
                    widthPercentage={90}
                    setRef={setSurnameInput}
                    onSubmitEditing={() => usernameInput.focus()}
                    blurOnSubmit={false}
                />
                <CustomTextInput
                    state={username}
                    setState={setUsername}
                    placeholder='Nome de Utilizador'
                    widthPercentage={90}
                    setRef={setUsernameInput}
                />
                <CustomTextInput
                    state={email}
                    setState={setEmail}
                    placeholder='E-mail'
                    widthPercentage={90}
                    marginBottomPercentage={4}
                    editable={false}
                />
                <CustomButton
                    text={'Guardar'}
                    onPress={async () => {
                            let updateStatus = await update();
                            if (updateStatus) {
                                setSnackBarVisible(true)
                                setTimeout(() => navigation.goBack(), 500);
                            }
                        }
                    }
                    backgroundColor={Colors.primaryKeyColor}
                    textColor={Colors.onPrimaryKeyColor}
                    widthPercentage={84}
                />
            </ScrollView>
            <YesNoAlert
                visible={updateDataAlertVisible}
                setVisible={setUpdateDataAlertVisible}
                title={'Detalhes da Conta'}
                description={'Desejas salvar as alterações?'}
                onPressYes={async () => {
                        let updateStatus = await update();
                        if (updateStatus) {
                            setSnackBarVisible(true);
                            setTimeout(() => navigation.dispatch(action), 500);
                        }
                    }
                }
                onPressNo={() => navigation.dispatch(action)}
            />
            <OkAlert
                visible={invalidDataAlertVisible}
                setVisible={setInvalidDataAlertVisible}
                title={'Dados Inválidos'}
                description={invalidDataMsg}
                onPressOk={() => {}}
            />
            <Snackbar
                visible={snackBarVisible}
                onDismiss={() => setSnackBarVisible(false)}
                duration={500}
            >
                Dados guardados com sucesso!
            </Snackbar>
            <PickImageModal
                state={modalVisible}
                setState={setModalVisible}
                image={image}
                setImage={setImage}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: Colors.primaryKeyColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollView: {
        width: Dimensions.get('window').width,
        alignItems: 'center',
        marginTop: '5%',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        backgroundColor: Colors.secondaryKeyColor
    },
    rowContainer: {
        flexDirection: 'row'
    },
    paymentMethod: {
        textAlign: 'center',
    },
    image: {
        alignSelf: 'center',
        width: .9 * Dimensions.get('window').width,
        height: .3 * Dimensions.get('window').height,
        marginBottom: '8%'
    }
});

export { ProfileDetailsScreen };
