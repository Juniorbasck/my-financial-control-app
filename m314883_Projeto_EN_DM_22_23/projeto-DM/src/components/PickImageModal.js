import {
    Pressable,
    Text,
    Modal,
    View,
    StyleSheet
} from 'react-native';
import { Fonts } from '../utils/Fonts';
import * as ImagePicker from 'expo-image-picker';

const PickImageModal = ({state, setState, image, setImage}) => {
    const openGallery = async () => {
        setState(false);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.canceled) {
            setImage({uri: result.assets[0].uri});
        }
    };

    const openCamera = async () => {
        setState(false);
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.canceled) {
            setImage({uri: result.assets[0].uri});
        }
    };

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={state}
            onRequestClose={() => setState(false)}
        >
            <Pressable
                onPress={() => setState(false)}
                style={styles.modalOuterPressable}
            >
                <View style={[styles.modalContainer, image ? {top: '80%'} : {top: '85%'}]}>
                    <Pressable 
                        style={styles.modalButton}
                        onPress={openGallery}
                    >
                        <Text style={Fonts.bodyLarge}>Galeria</Text>
                    </Pressable>
                    <Pressable 
                        style={styles.modalButton}
                        onPress={openCamera}
                    >
                        <Text style={Fonts.bodyLarge}>Câmera</Text>
                    </Pressable>
                    {
                        image && (
                            <Pressable 
                                style={styles.modalButton}
                                onPress={() => {
                                        setImage(null); 
                                        setState(false);
                                    }
                                }
                            >
                                <Text style={Fonts.bodyLarge}>Limpar</Text>
                            </Pressable>
                        )
                    }
                </View>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
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

export { PickImageModal };
