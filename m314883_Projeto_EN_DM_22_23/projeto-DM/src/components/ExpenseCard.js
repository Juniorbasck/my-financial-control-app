import { useState } from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet
} from 'react-native';
import { Fonts } from '../utils/Fonts';
import { Colors } from '../utils/Colors';
import { YesNoAlert } from './YesNoAlert';

const ExpenseCard = props => {
    const { title, entity, price, paid, date } = props.data.item;
    const { onPress, onLongPress } = props.data;

    let backgroundColor;
    if (paid) {
        backgroundColor = Colors.onSecondaryKeyColor;
    } else {
        let difference = (new Date() - new Date(date).getTime()) / 86400000;
        if (difference < -3) {
            backgroundColor = Colors.cardGreen;
        } else if (difference < 0) {
            backgroundColor = Colors.cardYellow;
        } else {
            backgroundColor = Colors.cardRed;
        }
    }

    const [alertVisible, setAlertVisible] = useState(false);

    return (
        <>
            <Pressable
                onPress={() => onPress(props.data.item)}
                onLongPress={() => setAlertVisible(true)}
            >
                <View style={[styles.pressableContainer, {backgroundColor: backgroundColor}]}>
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                        <Text style={[Fonts.bodyLarge, styles.title]} numberOfLines={2}>{title}</Text>
                        <Text style={[Fonts.bodyMedium, styles.entity]}>{entity}</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Text style={[Fonts.headlineSmall, styles.price]}>{price}€</Text>
                    </View>
                </View>
            </Pressable>
            <YesNoAlert
                title={'Deletar despesa?'}
                description={'Tem certeza que deseja deletar despesa?'}
                visible={alertVisible}
                setVisible={setAlertVisible}
                onPressYes={() => onLongPress(props.data.item)}
                onPressNo={() => {}}
            />
        </>
    );
};

const styles = StyleSheet.create({
    pressableContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 30,
        margin: 20,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        width: 350
    },
    title: {
        color: Colors.onPrimaryKeyColor, 
        fontWeight: 'bold'
    },
    entity: {
        color: Colors.onPrimaryKeyColor
    },
    price: {
        color: Colors.onPrimaryKeyColor, 
        fontWeight: 'bold'
    }
});

export { ExpenseCard };
