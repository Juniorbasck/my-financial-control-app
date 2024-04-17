import {
    ActivityIndicator,
    View,
    Text,
    StyleSheet
} from 'react-native';
import { Fonts } from '../utils/Fonts';

const LoadingIndicator = ({loadingMessage=''}) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color='black'/>
            <Text style={Fonts.headlineSmall}>{loadingMessage}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center'
    }
});

export { LoadingIndicator };
