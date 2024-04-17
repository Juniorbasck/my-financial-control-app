import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { Fonts } from '../utils/Fonts';
import { Colors } from '../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ResponsiveDimensions } from '../utils/ResponsiveDimensions';

const ExpenseStatus = ({total=0, toPay=0, paid=0}) => {
    return (
        <View style={styles.outerContainer}>
            <View style={styles.totalExpense}>
                <Text style={[Fonts.bodyLarge, styles.totalExpenseText]}>Despesa Total</Text>
                <Text style={[Fonts.headlineLarge, styles.totalExpenseValue]}>{total}€</Text>
            </View>
            <View style={styles.horizontalLine}/>
            <View style={styles.bottomRow}>
                <View style={styles.toPayContainer}>
                    <View style={styles.iconTextRow}>
                        <Text style={[Fonts.bodyLarge, styles.toPayText]}>Por pagar</Text>
                        <Ionicons name={'caret-up'} size={ResponsiveDimensions.expenseStatus.iconSize.value} color={Colors.onPrimaryKeyColor}/>
                    </View>
                    <Text style={[Fonts.bodyLarge, styles.toPayValue]}>{toPay}</Text>
                </View>
                <View style={styles.verticalLine}/>
                <View style={styles.paidContainer}>
                    <View style={styles.iconTextRow}>
                        <Text style={[Fonts.bodyLarge, styles.toPayText]}>Pagas</Text>
                        <Ionicons name={'caret-down'} size={ResponsiveDimensions.expenseStatus.iconSize.value} color={Colors.onPrimaryKeyColor}/>
                    </View>
                    <Text style={[Fonts.bodyLarge, styles.toPayValue]}>{paid}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        alignItems: 'baseline',
        justifyContent: 'center',
    },
    totalExpense: {
        marginTop: ResponsiveDimensions.expenseStatus.totalExpense.marginTop,
        marginBottom: ResponsiveDimensions.expenseStatus.totalExpense.marginBottom
    },
    horizontalLine: {
        borderColor: Colors.onPrimaryKeyColor, 
        borderWidth: .2,
        width: ResponsiveDimensions.expenseStatus.horizontalLine.width,
    },
    verticalLine: {
        marginTop: 30,
        borderColor: Colors.onPrimaryKeyColor,
        borderWidth: .2,
        height: ResponsiveDimensions.expenseStatus.verticalLine.height
    },
    bottomRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    toPayContainer: {
        flex: 1,
        alignItems: 'flex-start',
        marginTop: ResponsiveDimensions.expenseStatus.toPayContainer.marginTop,
        marginRight: ResponsiveDimensions.expenseStatus.toPayContainer.marginRight
    },
    iconTextRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    toPayText: {
        color: Colors.onPrimaryKeyColor,
        marginRight: ResponsiveDimensions.expenseStatus.toPayText.marginRight,
    },
    toPayValue: {
        color: Colors.onPrimaryKeyColor,
        marginTop: ResponsiveDimensions.expenseStatus.toPayValue.marginTop
    },
    paidContainer: {
        flex: 1,
        alignItems: 'flex-start',
        marginTop: ResponsiveDimensions.expenseStatus.paidContainer.marginTop,
        marginLeft: ResponsiveDimensions.expenseStatus.paidContainer.marginLeft
    },
    totalExpenseText: {
        color: Colors.onPrimaryKeyColor, 
        marginBottom: ResponsiveDimensions.expenseStatus.totalExpenseText.marginBottom
    },
    totalExpenseValue: {
        color: Colors.onPrimaryKeyColor, 
        marginTop: ResponsiveDimensions.expenseStatus.totalExpenseValue.marginTop, 
        fontWeight: 'bold'
    }
});

export { ExpenseStatus };
