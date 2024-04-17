import React, { useEffect, useState } from 'react';
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    Pressable,
    Dimensions,
    TextInput
} from 'react-native';
import { Colors } from '../../../utils/Colors';
import { Fonts } from '../../../utils/Fonts';
import { ExpenseCard } from '../../../components/ExpenseCard';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LoadingIndicator } from '../../../components/LoadingIndicator';
import {
    useAppSelector,
    useAppDispatch
} from '../../../app/hooks';
import {
    selectExpenses,
    setExpensesAsync,
} from '../../../features/expenses/expensesSlice';
import { deleteExpenseAsync } from '../../../../service';
import { setHistoricAsync } from '../../../features/historic/historicSlice';

const ExpenseScreen = ({navigation}) => {
    const [searchText, setSearchText] = useState('');
    const [icon, setIcon] = useState('reorder-three');
    const [closeFAB, setCloseFAB] = useState(false);
    const [title, setTitle] = useState('');

    const expenses = useAppSelector(selectExpenses);
    const expensesStatus = useAppSelector(state => state.expenses.status);

    const [filteredExpenses, setFilteredExpenses] = useState(expenses.value);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setExpensesAsync());
    }, []);

    useEffect(() => {
        setFilteredExpenses(getCurrentExpenseGroup(false));
    }, [expenses]);

    useEffect(() => {
        let text = 'Todas as Despesas';
        if (!filteredExpenses.length) {
            text = 'Sem Despesas';
        }
        setTitle(text);
    }, [filteredExpenses]);

    const handleOnPress = item => {
        navigation.navigate('EditExpense', {
            item: item,
            parentRoute: 'Expense'
        });
    };

    const handleLongPress = async expense => {
        await deleteExpenseAsync(expense);
        dispatch(setExpensesAsync());
        dispatch(setHistoricAsync());
    }

    const getCurrentExpenseGroup = (useNext=true) => {
        let compare = useNext ? getNextIcon() : icon;
        switch (compare) {
            default:
            case 'reorder-three': 
                return expenses.value;
            case 'cash':
                return expenses.value.filter(ele => !ele.paid);
            case 'checkmark-done':
                return expenses.value.filter(ele => ele.paid);
        }
    }

    const getNextIcon = () => {
        switch (icon) {
            case 'reorder-three':
                return 'cash';
            case 'cash':
                return 'checkmark-done';
            default:
            case 'checkmark-done':
                return 'reorder-three';
        }
    }
    
    return expensesStatus === 'loading' ? (
        <LoadingIndicator/>
    ) : (
        <View style={styles.outerContainer}>
            <View style={styles.titleContainer}>
                <Text style={[Fonts.displaySmall, styles.greetingText]}>{title}</Text> 
            </View>
            {
                expenses.value.length == 0 && (
                    <Pressable
                        style={{marginVertical: '5%'}}
                        onPress={() => navigation.navigate('CreateExpense')}
                    >
                        <Text style={styles.addNewExpenseText}>Adicione uma nova despesa</Text>
                    </Pressable>
                )
            }
            <View 
                style={
                    [
                        styles.expenseBoard,
                        expenses.value.length == 0 ? {opacity: 0} : {flex: 5}
                    ]
                }
            >
                <View 
                    style={styles.searchBar}
                >
                    <Pressable
                        onPress={() => {
                                setSearchText('');
                                setFilteredExpenses(getCurrentExpenseGroup(false));
                            }
                        }
                    >
                        <Ionicons name='search' size={20} color={'grey'}/>
                    </Pressable>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Pesquisar'
                        defaultValue={searchText}
                        onChangeText={text => {
                            setSearchText(text);
                            if (!text.length) {
                                setFilteredExpenses(getCurrentExpenseGroup(false));
                            } else {
                                setFilteredExpenses(
                                    getCurrentExpenseGroup(false).filter(ele => ele.title.toLowerCase().includes(text.toLowerCase()))
                                );
                            }
                        }}
                        onFocus={() => setCloseFAB(true)}
                        onBlur={() => setCloseFAB(false)}
                    />
                    <Pressable
                        onPress={() => {
                                setIcon(getNextIcon());
                                if (!searchText.length) {
                                    setFilteredExpenses(getCurrentExpenseGroup());
                                } else {
                                    setFilteredExpenses(
                                        getCurrentExpenseGroup().filter(ele => ele.title.toLowerCase().includes(searchText.toLowerCase()))
                                    );
                                }
                            }
                        }
                    >
                        <Ionicons name={icon} size={25} color={'grey'}/>
                    </Pressable>
                </View>
                <FlatList
                    data={filteredExpenses}
                    renderItem={item => <ExpenseCard data={{...item, onPress: handleOnPress, onLongPress: handleLongPress}}/>}
                    keyExtractor={item => item.id}
                />
                {
                    expenses.value.length > 0 && !closeFAB && (
                        <Pressable 
                            style={styles.floatingActionButton}
                            onPress={() => navigation.navigate('CreateExpense')}
                        >
                            <Text style={styles.plus}>+</Text>
                        </Pressable>
                    )
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: Colors.primaryKeyColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        marginVertical: '5%'
    },
    addNewExpenseText: {
        color: Colors.onPrimaryKeyColor,
        textDecorationLine: 'underline'
    },
    greetingText: {
        fontWeight: 'bold', 
        color: Colors.onPrimaryKeyColor
    },
    expenseBoard: {
        borderTopRightRadius: 60,
        borderTopLeftRadius: 60,
        paddingHorizontal: '2%',
        backgroundColor: Colors.secondaryKeyColor,
        width: Dimensions.get('window').width
    },
    searchBar: {
        marginVertical: '5%',
        flexDirection: 'row',
        backgroundColor: Colors.onPrimaryKeyColor,
        borderColor: Colors.onSecondaryKeyColor,
        borderWidth: 1,
        borderRadius: 20,
        padding: '2%',
        marginHorizontal: '8%',
        alignItems: 'center'
    },
    textInput: {
        flex: 1,
        marginLeft: '2%',
    },
    floatingActionButton: {
        position: 'absolute',
        left: '75%',
        top: '85%',
        backgroundColor: Colors.onPrimaryKeyColor,
        width: '15%',
        height: '10%',
        borderRadius: 50,
        borderWidth: .5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    plus: {
        color: Colors.primaryKeyColor,
        fontSize: 30,
    }
});

export { ExpenseScreen };
