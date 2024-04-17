import React from 'react';
import { 
    TextInput, 
    StyleSheet, 
    Dimensions
} from 'react-native';
import { Colors } from '../utils/Colors';

const CustomTextInput = (
    {
        state, 
        setState, 
        placeholder='', 
        widthPercentage=43, 
        marginTopPercentage=2, 
        marginBottomPercentage=2, 
        keyboardType='ascii-capable', 
        hide=false, 
        autofocus=false,
        editable=true,
        maxLength=30,
        onSubmitEditing=null,
        blurOnSubmit=true,
        setRef=null
}) => {
    return ( 
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={'grey'}
            keyboardType={keyboardType}
            secureTextEntry={hide}
            defaultValue={state}
            editable={editable}
            style={
                [
                    styles.textInput, 
                    {
                        width: widthPercentage / 100 * Dimensions.get('window').width, 
                        marginTop: marginTopPercentage / 100 * Dimensions.get('window').height, 
                        marginBottom: marginBottomPercentage / 100 * Dimensions.get('window').height
                    }
                ]
            }
            onChangeText={text => setState(text)}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={blurOnSubmit}
            ref={setRef == null ? null : input => setRef(input)}
            autoFocus={autofocus}
            maxLength={maxLength}
        />
    );
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: Colors.secondaryKeyColor,
        borderColor: Colors.onSecondaryKeyColor,
        borderWidth: 1,
        borderRadius: 5,
        padding: '2%',
        marginHorizontal: '2%'
    }
});

export { CustomTextInput };
