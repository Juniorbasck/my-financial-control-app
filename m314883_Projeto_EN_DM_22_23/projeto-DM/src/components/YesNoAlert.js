import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Modal,
    Dimensions
} from 'react-native';
import { Fonts } from '../utils/Fonts';

const YesNoAlert = ({visible, setVisible, title, description, onPressYes, onPressNo}) => {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={visible}
            onRequestClose={() => setVisible(false)}
        >
            <Pressable
                onPress={() => setVisible(false)}
                style={styles.alertOuterPressable}
            >
                <View style={styles.alertContainer}>
                    <Text style={[styles.title, Fonts.headlineSmall]}>{title}</Text>
                    <Text style={[styles.description, Fonts.bodyLarge]}>{description}</Text>
                    <View style={styles.buttonContainer}>
                        <Pressable 
                            style={styles.alertButton}
                            onPress={() => {
                                    onPressYes && onPressYes();
                                    setVisible(false);
                                }
                            }
                        >
                            <Text style={Fonts.bodyLarge}>Sim</Text>
                        </Pressable>
                        <Pressable 
                            style={styles.alertButton}
                            onPress={() => {
                                    onPressNo && onPressNo();
                                    setVisible(false);
                                }
                            }
                        >
                            <Text style={Fonts.bodyLarge}>Não</Text>
                        </Pressable>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    alertOuterPressable: {
        width: '100%', 
        height: '100%'
    },
    alertContainer: {
        position: 'absolute',
        left: '10%',
        top: '35%',
        width: .8 * Dimensions.get('window').width,
        // height: .3 * Dimensions.get('window').height,
        backgroundColor: 'white',
        padding: 15
    },
    title: {
        margin: 5,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    description: {
        margin: 5,
        textAlign: 'left'
    },
    buttonContainer: {
        flex: 1,
        marginTop: '25%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    alertButton: {
        marginHorizontal: '5%'
    }
});

export { YesNoAlert };
