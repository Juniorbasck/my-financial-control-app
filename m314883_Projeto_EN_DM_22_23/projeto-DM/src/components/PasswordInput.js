import { useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Dimensions,
    Pressable
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../utils/Colors';

const PasswordInput = ({
        state, 
        setState, 
        widthPercentage=90, 
        marginTopPercentage=0, 
        marginBottomPercentage=0,
        editable=true,
        placeholder='Palavra-passe',
        autofocus=false,
        setRef=null,
        onSubmitEditing=null,
        blurOnSubmit=true
}) => {
    const [passwordIcon, setPasswordIcon] = useState('eye');

    return (
        <View style={[
            styles.container,
            {
                width: widthPercentage / 100 * Dimensions.get('window').width,
                marginTop: marginTopPercentage / 100 * Dimensions.get('window').height,
                marginBottom: marginBottomPercentage / 100 * Dimensions.get('window').height
            }
        ]}>
            <TextInput
                style={{flex: 1}}
                placeholder={placeholder}
                placeholderTextColor='grey'
                defaultValue={state}
                onChangeText={text => setState(text)}
                secureTextEntry={ passwordIcon === 'eye' ? true : false }
                editable={editable}
                autoFocus={autofocus}
                ref={setRef == null ? null : input => setRef(input)}
                onSubmitEditing={onSubmitEditing}
                blurOnSubmit={blurOnSubmit}
            />
            <Pressable 
                onPress={() => setPasswordIcon( passwordIcon === 'eye' ? 'eye-off' : 'eye' )}
            >
                <Ionicons name={passwordIcon} size={24} color='black'/>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.secondaryKeyColor,
        borderColor: Colors.onSecondaryKeyColor,
        borderWidth: 1,
        borderRadius: 5,
        padding: '2%',
        marginHorizontal: '2%',
    }
});

export { PasswordInput };
