import React, { useState } from 'react';
import {
    Pressable,
    Text,
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Fonts } from '../utils/Fonts';
import { Colors } from '../utils/Colors';
import { PickImageModal } from './PickImageModal';

const CustomImagePicker = ({state, setState, text, widthPercentage=90, marginBottomPercentage=5}) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                style={[styles.pressableContainer, {width: widthPercentage / 100 * Dimensions.get('window').width, marginBottom: marginBottomPercentage / 100 * Dimensions.get('window').height}]}
            >   
                <View style={[styles.sideView, {alignItems: 'flex-start'}]}>
                    <Text style={Fonts.bodyMedium}>{text}</Text>
                </View>
                {
                    state && (
                        <View style={[styles.sideView, {alignItems: 'center'}]}>
                            <Text style={Fonts.bodySmall}>{state.uri.split('/')[state.uri.split('/').length - 1]}</Text>
                        </View>
                    )
                }
                <View style={[styles.sideView, {alignItems: 'flex-end'}]}>
                    <Ionicons name={'camera'} size={30} color={'black'}/>
                </View>
            </Pressable>
            <PickImageModal
                state={modalVisible}
                setState={setModalVisible}
                image={state}
                setImage={setState}
            />
        </>
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
    sideView: {
        flex: 1, 
        margin: '2%'
    },
    modalContainer: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'white',
        padding: '5%'
    },
    modalButton: {
        margin: 10
    },
    modalOuterPressable: {
        width: '100%', 
        height: '100%'
    }
});

export { CustomImagePicker };
