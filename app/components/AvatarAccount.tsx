import React from 'react'
import { TouchableOpacity, View, ActivityIndicator, StyleSheet } from 'react-native'
import modules from '../modules'
import FastImage from 'react-native-fast-image'
import Icon from "react-native-vector-icons/MaterialIcons";
import ShadowView from 'react-native-simple-shadow-view';
import { size } from 'lodash';

interface Props {
    avatar: any;
    uploading?: boolean;
    onChangePhoto: () => void;
    notChange?: boolean
    size?: number
    noShadow?: boolean
    update?: boolean
}

export default (props: Props) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={styles.midProfile}>
                <View style={{ position: 'relative', opacity: 1 }}>
                    <ShadowView style={[styles.shadow, props.size ? { width: props.size, height: props.size } : null, props.noShadow && { shadowOpacity: 0 }]}>
                        <View style={[styles.profileIcon, props.size ? { width: props.size, height: props.size } : null]}>
                            {
                                props.uploading ? <ActivityIndicator size={'large'} /> :
                                    <FastImage style={styles.image} source={{ uri: props.avatar }} />
                            }
                        </View>
                        {
                            !props.notChange ? <TouchableOpacity disabled={props.uploading} style={styles.camera} onPress={props.onChangePhoto}>
                                <Icon name={props.update ? "create" : "photo-camera"} style={styles.photoCamera} />
                            </TouchableOpacity> : null
                        }

                    </ShadowView>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        backgroundColor: modules.PRIMARY_TAB
    },
    midProfile: {
        justifyContent: "center",
        alignItems: "center",
        position: 'relative',
    },
    profileIcon: {
        borderRadius: 1500,
        overflow: "hidden",
        height: 150,
        width: 150,
        justifyContent: "center",
        alignItems: "center",
    },
    shadow: {
        borderRadius: 1000,
        height: 150,
        width: 150,
        backgroundColor: modules.WHITE,
        shadowColor: "#888",
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 10,
        shadowOpacity: 0.54,
        elevation: 3,
    },
    photoCamera: {
        fontSize: modules.FONT_H5,
        color: modules.TEXT
    },
    camera: {
        position: "absolute",
        bottom: 5,
        right: 5,
        padding: modules.BODY_HORIZONTAL / 3,
        backgroundColor: modules.BACKGROUND_PRIMARY,
        borderColor: modules.WHITE,
        borderWidth: 1,
        borderRadius: modules.RADIUS_BUTTON,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
})