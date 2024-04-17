import React, { useState } from 'react';
import {
    Pressable,
    Text,
    StyleSheet,
    View,
    Modal,
    Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Fonts } from '../utils/Fonts';
import { Colors } from '../utils/Colors';
import { format } from '../utils/DateFormatter';
import DatePicker from 'react-native-modern-datepicker';

const CustomDatePicker = (
    {
        state, 
        setState, 
        widthPercentage=90, 
        marginBottomPercentage=5
    }
) => {
    const [modalOpenState, setModalOpenState] = useState(false);

    return (
        <View>
            <Pressable
                onPress={() => setModalOpenState(!modalOpenState)}
                style={[styles.pressableContainer, {width: widthPercentage / 100 * Dimensions.get('window').width, marginBottom: marginBottomPercentage / 100 * Dimensions.get('window').height}]}
            >   
                <View style={[styles.sideView, {alignItems: 'flex-start'}]}>
                    <Text style={Fonts.bodyMedium}>{format(state, '/', '-')}</Text>
                </View>
                <View style={[styles.sideView, {alignItems: 'flex-end'}]}>
                    <Ionicons name={'calendar'} size={30} color={'black'}/>
                </View>
            </Pressable>
            <Modal
                animationType={'slide'}
                visible={modalOpenState}
                transparent={true}
            >
                <Pressable
                    onPress={() => setModalOpenState(false)}
                    style={styles.modalOuterPressable}
                >
                    <View
                        style={styles.modalView}
                    >
                        <DatePicker
                            mode={'calendar'}
                            current={state}
                            selected={state}
                            onDateChange={date => {
                                setState(format(date, '-', '/'))
                                setModalOpenState(!modalOpenState);
                            }}
                        />
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    pressableContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: Colors.primaryKeyColor,
        borderWidth: 1,
        borderRadius: 5,
        padding: '1%',
    },
    modalOuterPressable: {
        width: '100%', 
        height: '100%'
    },
    modalView: {
        position: 'absolute',
        left: '5%',
        top: '26%',
        width: '90%',
        height: '48%',
        backgroundColor: 'white'
    },
    sideView: {
        flex: 1, 
        margin: '2%'
    }
});

export { CustomDatePicker };
