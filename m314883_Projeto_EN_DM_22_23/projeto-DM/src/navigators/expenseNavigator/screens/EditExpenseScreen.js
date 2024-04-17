import { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Dimensions,
    Image
} from 'react-native';
import { Colors } from '../../../utils/Colors';
import { Fonts } from '../../../utils/Fonts';
import { CustomTextInput } from '../../../components/CustomTextInput';
import { CustomButton } from '../../../components/CustomButton';
import { CustomDatePicker } from '../../../components/CustomDatePicker';
import { CustomDropdown } from '../../../components/CustomDropdown';
import { CustomImagePicker } from '../../../components/CustomImagePicker';
import { CustomCheckbox } from '../../../components/CustomCheckbox';
import { getPaymentMethods } from '../../../../service';
import { Snackbar } from 'react-native-paper';
import { updateExpenseAsync } from '../../../../service';
import { useAppDispatch } from '../../../app/hooks';
import { setExpensesAsync } from '../../../features/expenses/expensesSlice';
import { OkAlert } from '../../../components/OkAlert';
import { YesNoAlert } from '../../../components/YesNoAlert';
import { setHistoricAsync } from '../../../features/historic/historicSlice';

function validate(title, entity, price) {
    return title.length > 0 && entity.length > 0 && price?.toString().length > 0;
}

function dataChanged(item, title, entity, date, price, paymentMethod, image, paid) {
    return item.title != title || item.entity != entity || item.date != date || item.price != price || item.paymentMethod != paymentMethod || item.paid != paid || item.image != image;
}

const EditExpenseScreen = ({route, navigation}) => {
    const { item, parentRoute } = route.params;
    const [title, setTitle] = useState(item.title);
    const [entity, setEntity] = useState(item.entity);
    const [date, setDate] = useState(item.date);
    const [price, setPrice] = useState(item.price.toString());
    const [paymentMethod, setPaymentMethod] = useState(item.paymentMethod);
    const [image, setImage] = useState(item.image);
    const [paid, setPaid] = useState(item.paid);
    
    const [paymentMethods, setPaymentMethods] = useState([]);

    const [action, setAction] = useState();

    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [invalidDataAlertVisible, setInvalidDataAlertVisible] = useState(false);
    const [updateDataAlertVisible, setUpdateDataAlertVisible] = useState(false);

    const [invalidDataAlertMsg, setInvalidDataAlertMsg] = useState('');

    const dispatch = useAppDispatch();
    
    const edit = async () => {
        let localTitle = title.trim(), localEntity = entity.trim(), localPrice = price.trim();
        if (validate(localTitle, localEntity, price)) {
            if (dataChanged(item, localTitle, localEntity, date, localPrice, paymentMethod, image, paid)) {
                try {
                    let newExpense = {
                        id: item.id,
                        title: localTitle,
                        entity: localEntity,
                        date: date,
                        price: localPrice,
                        paymentMethod: paymentMethod,
                        image: image,
                        paid: paid
                    };
                    await updateExpenseAsync(item, newExpense);
                    dispatch(setExpensesAsync());
                    dispatch(setHistoricAsync());
                } catch (err) {
                    setInvalidDataAlertMsg(err.message);
                    setInvalidDataAlertVisible(true);
                    return false;
                }
            }
            return true;
        } else {
            setInvalidDataAlertMsg('Preencha o título, entidade e preço corretamente');
            setInvalidDataAlertVisible(true);
            return false;
        }
    }

    useEffect(() => {
        navigation.addListener('beforeRemove', e => {
            let localTitle = title.trim(), localEntity = entity.trim(), localPrice = price.trim();
            if (e.data.action.type === 'POP' && dataChanged(item, localTitle, localEntity, date, localPrice, paymentMethod, image, paid)) {
                e.preventDefault();
                setAction(e.data.action);
                setUpdateDataAlertVisible(true);
            }
        });
    }, [navigation, title, entity, date, price, paymentMethod, image, paid]);

    useEffect(() => {
        getPaymentMethods(methods => setPaymentMethods(methods));
    }, []);
    
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
                <CustomTextInput
                    state={title}
                    setState={setTitle}
                    placeholder='Título'
                    widthPercentage={90}
                    marginTopPercentage={5}
                    autofocus={true}
                />
                <CustomTextInput
                    state={entity}
                    setState={setEntity}
                    placeholder='Entidade'
                    widthPercentage={90}
                />
                <CustomTextInput
                    state={price}
                    setState={setPrice}
                    keyboardType='numeric'
                    placeholder='Preço'
                    widthPercentage={90}
                    marginBottomPercentage={4}
                />
                <CustomDatePicker
                    state={date}
                    setState={setDate}
                    widthPercentage={90}
                    marginBottomPercentage={3}
                />
                <View style={styles.rowContainer}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={Fonts.bodyLarge}>Método de</Text>
                        <Text style={Fonts.bodyLarge}>Pagamento</Text>
                    </View>
                    <CustomDropdown
                        state={paymentMethod}
                        setState={setPaymentMethod}
                        options={paymentMethods}
                        widthPercentage={40}
                        marginBottomPercentage={3}
                    />
                </View>
                <CustomImagePicker
                    state={image}
                    setState={setImage}
                    text={'Foto da Fatura (opcional)'}
                />
                {
                    image && (
                        <Image
                            source={image}
                            resizeMode='contain'
                            style={styles.image}
                        />
                    )
                }
                <CustomCheckbox
                    state={paid}
                    setState={setPaid}
                    marginTopPercentage={0}
                    marginBottomPercentage={2}
                    text={'Pago'}
                    size={28}
                    round={true}
                />
                <CustomButton
                    text={'Guardar'}
                    onPress={async () => {
                            let edited = await edit();
                            if (edited) {
                                setSnackBarVisible(true);
                                setTimeout(() => navigation.navigate(parentRoute), 500);
                            }
                            
                        }
                    }
                    backgroundColor={Colors.primaryKeyColor}
                    textColor={Colors.onPrimaryKeyColor}
                    widthPercentage={84}
                />
            </ScrollView>
            <Snackbar
                visible={snackBarVisible}
                onDismiss={() => setSnackBarVisible(false)}
                duration={500}
            >
                Despesa guardada com sucesso!
            </Snackbar>
            <YesNoAlert
                title={'Editar Despesa'}
                description={'Desejas salvar as alterações?'}
                visible={updateDataAlertVisible}
                setVisible={setUpdateDataAlertVisible}
                onPressYes={async () => {
                        let editStatus = await edit();
                        if (editStatus) {
                            setSnackBarVisible(true);
                            setTimeout(() => navigation.dispatch(action), 500);
                        }
                    }
                }
                onPressNo={() => navigation.dispatch(action)}
            />
            <OkAlert
                title={'Dados Inválidos!'}
                description={invalidDataAlertMsg}
                visible={invalidDataAlertVisible}
                setVisible={setInvalidDataAlertVisible}
                onPressOk={() => {}}
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

export { EditExpenseScreen };
