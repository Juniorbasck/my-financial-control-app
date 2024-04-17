import React from 'react';
import {
    View,
    Dimensions,
    Pressable,
    StyleSheet,
    Text,
} from 'react-native';
import { Fonts } from '../utils/Fonts';
import Ionicons from '@expo/vector-icons/Ionicons';

const CustomCheckbox = ({state, setState, text, size=10, round=false, marginBottomPercentage=5, marginTopPercentage=5}) => {
    return (
        <Pressable style={
                [
                    styles.pressableContainer, {
                        marginBottom: marginBottomPercentage / 100 * Dimensions.get('window').height, 
                        marginTop: marginTopPercentage / 100 * Dimensions.get('window').height
                    }
                ]
            }
            onPress={() => {
                    setState(!state);
                }
            }
        > 
            <View
                style={
                    [
                        styles.iconContainer, 
                        {
                            width: size, 
                            height: size
                        },
                        round ? {borderRadius: size} : {}
                    ]
                }
            >   
                <Ionicons name={ state ? 'checkmark' : '' } size={size} color={'black'}/>
            </View>
            <Text style={[styles.text, Fonts.bodyLarge]}>
                {text}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    pressableContainer: {
        flexDirection: 'row'
    },
    iconContainer: {
        backgroundColor: 'white',
        margin: '2%'
    },
    text: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold'
    }
});

export { CustomCheckbox };
