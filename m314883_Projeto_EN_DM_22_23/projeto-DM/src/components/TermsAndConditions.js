import React, { useState } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Modal
} from 'react-native';
import { Colors } from '../utils/Colors';
import { ResponsiveDimensions } from '../utils/ResponsiveDimensions';
import { Fonts } from '../utils/Fonts';
import { CustomButton } from './CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';

const TermsAndConditions = ({state, setState}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [checked, setChecked] = useState(state);
    const [icon, setIcon] = useState(checked ? 'checkmark' : '');

    return (
        <View style={styles.container}>
            <Modal
                animationType='fade'
                visible={modalVisible}
            >
                <View style={styles.modalView}>
                    <Text style={[Fonts.headlineMedium, styles.modalTitle]}>Termos e Condições</Text>
                    <ScrollView style={styles.modalScrollView}>
                        <Text style={[Fonts.bodyLarge, {textAlign: 'justify'}]}>
                        Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.
                        Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.
                        Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.
                        Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.
                        Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.
                        Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.
                        Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.
                        Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.
                        Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.
                        Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.
                        Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.
                        Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.
                        Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.
                        Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.
                        Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia 
                        nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                        ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur 
                        vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum 
                        tellus.
                        </Text>
                    </ScrollView>
                    <CustomButton
                        text={'Fechar'}
                        onPress={() => setModalVisible(!modalVisible)}
                        backgroundColor={Colors.primaryKeyColor}
                        textColor={Colors.onPrimaryKeyColor}
                        widthPercentage={60}
                    />
                </View>
            </Modal>
        {
            !modalVisible && (
                <View style={styles.termsAndConditionsContainer}>
                    <Pressable
                        onPress={() => {
                            setChecked(!checked);
                            if (checked) {
                                setIcon('checkmark');
                                setState(true);
                            } else {
                                setIcon('');
                                setState(false);
                            }
                        }}
                        style={{flexDirection: 'row'}}
                    >
                        <View style={[styles.iconContainer, {marginRight: 10}]}>
                            <Ionicons name={icon} size={20}/>
                        </View>
                        <Text style={[Fonts.bodyMedium, {marginRight: 5}]}>Concordo com os</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={[styles.termsAndConditionsLink, Fonts.bodyMedium]}>termos e condições</Text>
                    </Pressable>
                </View>
            )
        }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    termsAndConditionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconContainer: {
        backgroundColor: Colors.onPrimaryKeyColor,
        width: ResponsiveDimensions.squareCheckbox.width,
        height: ResponsiveDimensions.squareCheckbox.height
    },
    termsAndConditionsLink: {
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        borderColor: 'black',
    },
    modalTitle: {
        marginBottom: 5
    },
    modalScrollView: {
        marginBottom: 10,
        padding: 9
    }
});

export { TermsAndConditions };

            