import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ShadowView from 'react-native-simple-shadow-view';
import _styles from '../_styles';
import modules from '../modules';
import { fontSemiBold } from '../../functions/customFont';
import MainButton from './MainButton';
import FastImage from 'react-native-fast-image';

interface Props {
    height?: number,
    bookUrl?: { uri: string } | any,
    onBook?: () => void
    onError?: () => void
    title?: string
    width?: number
    filename: any
}

export default (props: Props) => {
    const { height, onBook } = props
    return (
        <View style={{ marginBottom: modules.BODY_HORIZONTAL_18 }}>
            <ShadowView style={[styles.container, _styles.bookShadow]} pointerEvents={onBook ? 'auto' : 'none'}>
                <MainButton
                    onPress={onBook ? onBook : () => null}
                    component={
                        <View
                            style={{ width: height ? height : 100, height: height ? height : 100, borderRadius: 4, overflow: "hidden" }}>
                            <FastImage
                                source={{ uri: props?.bookUrl?.uri }}
                                style={{ width: '100%', height: '100%' }}
                            />

                        </View>
                    }
                />
            </ShadowView>
            {
                props.title ?
                    <Text numberOfLines={1} style={{ fontSize: modules.FONT_P, ...fontSemiBold, marginTop: modules.BODY_HORIZONTAL_18, flex: 1, width: 100 }}>{props.title}</Text>
                    : null
            }
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        // alignItems: 'center',
        // overflow: 'visible'
    },
    containerLoading: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 100,
    },
    loading: {
        borderRadius: 0,
        padding: 0,
        margin: 0,
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        // marginRight: modules.BODY_HORIZONTAL
    },
});
